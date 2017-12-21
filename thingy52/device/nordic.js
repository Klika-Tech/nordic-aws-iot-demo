const readline = require('readline');
const Thingy = require('thingy52');
const forEach = require('lodash/forEach');
const toInteger = require('lodash/toInteger');
const toLower = require('lodash/toLower');
const replace = require('lodash/replace');
const { calibrate, getColor } = require('./color');

const SCAN_WINDOW = 5000;
const SENSOR_INIT_TIMEOUT = 2000;
const TELEMETRY_INTERVAL = 1000;
const MAX_ECO2_LEVEL = 800;
let scanResults = [];
let sigint = false;

let currentThingy = null;

let connected = false;
let gasAlarmEnabled = false;

const deviceShadow = {
    eco2: 400, // CO2 level in air
    tvoc: 0, // organic gas detection in air
    temperature: 0,
    humidity: 0,
    pressure: 1000,
    batteryLevel: 80,
    marker: false, // tap on central button
    accelerometer: [0, 0, 0],
    gyroscope: [0, 0, 0],
    compass: [0, 0, 0], // Not work?
    color: getColor(), // Scan color on back side
    orientation: 0, // pure rotation detection
    tap: { // Not work?
        direction: 0,
        count: 0,
    },
    quaternion: { // detect rotation in a 4D coordinate system
        x: 0,
        y: 0,
        z: 0,
        w: 0,
    },
    stepCounter: { // detect steps count
        steps: 0,
        time: 0,
    },
    euler: { // calculate Angles of Euler
        roll: 0,
        pitch: 0,
        yaw: 0,
    },
    rotation: { // calculate vector of rotation
        m_11: 0,
        m_12: 0,
        m_13: 0,
        m_21: 0,
        m_22: 0,
        m_23: 0,
        m_31: 0,
        m_32: 0,
        m_33: 0,
    },
    heading: 0, // determinate direction
    gravity: [0, 0, 0],
};

// setup cleanup handler
require('./cleanup').Cleanup(handleCleanup);

function scan() {
    console.log(`Searching Thingy:52 (${SCAN_WINDOW}ms) ...`);
    scanResults = [];

    Thingy.discoverAll((thingy) => {
        scanResults.push(thingy);
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (scanResults.length) {
                resolve(scanResults);
            } else {
                reject({
                    message: 'Not found any Thingy:52',
                });
            }
        }, SCAN_WINDOW);
    });
}

function scanByMac(mac) {
    console.log(`Searching Thingy:52 by MAC: ${mac}`);
    const id = replace(toLower(mac), new RegExp(':', 'g'), '');
    return new Promise((resolve, reject) => {
        Thingy.discoverById(id, (thingy) => {
            resolve(thingy);
        });
        setTimeout(() => {
            reject({
                message: `Not found Thingy:52 by id: ${id}`,
            });
        }, SCAN_WINDOW);
    });
}

function renderScanResults(things) {
    console.log('Scan results:');
    forEach(things, (item, index) => {
        console.log(`${index + 1}) ${item.address}`);
    });
    return Promise.resolve(things);
}

function questionChooseThingy(things) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter number of Thingy:52 from scan: ', (a) => {
            const answer = toInteger(a);
            const isValid = answer >= 1 && answer <= things.length;
            if (!isValid) {
                rl.close();
                reject({
                    message: 'Invalid value. Interrupting.',
                });
            } else {
                const thingy = things[answer - 1];
                console.log(`You choose: ${thingy.address}`);
                resolve(thingy);
            }
        });
    });
}

function connectAndSetupEnvironment(thingy) {
    return new Promise((resolve, reject) => {
        thingy.connectAndSetUp((error) => {
            const handleError = message => (e) => {
                if (e) {
                    reject({
                        message: `${message}: ${e}`,
                    });
                }
            };
            const setLedAlarm = (isEnabled) => {
                if (!isEnabled) {
                    thingy.led_off();
                } else {
                    thingy.led_breathe({
                        color: 1,
                        intensity: 100,
                        delay: 1000,
                    });
                }
            };

            handleError('Connection error')(error);

            if (error) return; currentThingy = thingy;

            // Environment
            // ------------ //
            thingy.temperature_interval_set(TELEMETRY_INTERVAL, handleError('Set temperature interval error'));
            thingy.temperature_enable(handleError('Set temperature enable error'));
            thingy.on('temperatureNotif', (metric) => { deviceShadow.temperature = metric; });
            thingy.pressure_interval_set(TELEMETRY_INTERVAL, handleError('Set pressure interval error'));
            thingy.pressure_enable(handleError('Set pressure enable error'));
            thingy.on('pressureNotif', (metric) => { deviceShadow.pressure = metric; });
            thingy.humidity_interval_set(TELEMETRY_INTERVAL, handleError('Set humidity interval error'));
            thingy.humidity_enable(handleError('Set humidity enable error'));
            thingy.on('humidityNotif', (metric) => { deviceShadow.humidity = metric; });
            thingy.gas_mode_set(2, handleError('Gas mode set error'));
            thingy.gas_enable(handleError('Gas enable error'));
            thingy.on('gasNotif', (metric) => {
                deviceShadow.eco2 = metric.eco2;
                deviceShadow.tvoc = metric.tvoc;
                if (deviceShadow.eco2 >= MAX_ECO2_LEVEL) {
                    if (!gasAlarmEnabled) {
                        console.log(`Gas Alarm (CO2:${deviceShadow.eco2}) enabled!`);
                        setLedAlarm(true);
                    }
                    gasAlarmEnabled = true;
                } else if (gasAlarmEnabled) {
                    console.log(`Gas Alarm (CO2:${deviceShadow.eco2}) disabled.`);
                    setLedAlarm();
                    gasAlarmEnabled = false;
                }
            });
            thingy.color_enable(handleError('Color enable error'));
            thingy.color_interval_set(TELEMETRY_INTERVAL, handleError('Color interval set error'));
            thingy.on('colorNotif', (color) => {
                calibrate(color);
                deviceShadow.color = getColor();
                setTimeout(() => {
                    thingy.color_ref_led_set(deviceShadow.color, handleError('Color sensor configure error'));
                }, 20);
            });

            // Motions
            // ------------ //
            thingy.raw_enable(handleError('Motion Raw enable error'));
            thingy.on('rawNotif', (rawData) => {
                deviceShadow.accelerometer = [
                    rawData.accelerometer.x,
                    rawData.accelerometer.y,
                    rawData.accelerometer.z,
                ];
                deviceShadow.gyroscope = [
                    rawData.gyroscope.x,
                    rawData.gyroscope.y,
                    rawData.gyroscope.z,
                ];
                deviceShadow.compass = [
                    rawData.compass.x,
                    rawData.compass.y,
                    rawData.compass.z,
                ];
            });
            thingy.tap_enable(handleError('Tap enable error'));
            thingy.on('tapNotif', (tap) => {
                deviceShadow.tap = tap;
            });
            thingy.orientation_enable(handleError('Orientation enable error'));
            thingy.on('orientationNotif', (orientation) => {
                deviceShadow.orientation = orientation;
            });
            thingy.quaternion_enable(handleError('Quaternion enable error'));
            thingy.on('quaternionNotif', (quaternion) => {
                deviceShadow.quaternion = quaternion;
            });
            thingy.stepCounter_enable(handleError('stepCounter enable error'));
            thingy.on('stepCounterNotif', (stepCounter) => {
                deviceShadow.stepCounter = stepCounter;
            });
            thingy.euler_enable(handleError('Euler enable error'));
            thingy.on('eulerNotif', (euler) => {
                deviceShadow.euler = euler;
            });
            thingy.rotation_enable(handleError('Rotation enable error'));
            thingy.on('rotationNotif', (rotation) => {
                deviceShadow.rotation = rotation;
            });
            thingy.heading_enable(handleError('Heading enable error'));
            thingy.on('headingNotif', (heading) => {
                deviceShadow.heading = heading;
            });
            thingy.gravity_enable(handleError('Gravity enable error'));
            thingy.on('gravityNotif', (gravity) => {
                deviceShadow.gravity = [
                    gravity.x,
                    gravity.y,
                    gravity.z,
                ];
            });

            // User Interface
            // ------------ //
            thingy.button_enable(handleError('Button enable error'));
            thingy.on('buttonNotif', (state) => {
                if (state === 'Pressed') {
                    deviceShadow.marker = true;
                }
            });
            setLedAlarm(false);

            // Battery
            // ------------ //
            thingy.on('batteryLevelChange', (level) => { deviceShadow.batteryLevel = level; });
            thingy.notifyBatteryLevel(handleError('Enable battery level error'));

            setTimeout(() => {
                console.log('Connected!');
                connected = true;
                deviceShadow.connected = connected;
                resolve(thingy);
            }, SENSOR_INIT_TIMEOUT);
        });
    });
}

function connect(thingy) {
    thingy.on('disconnect', function () {
        currentThingy = null;
        connected = false;
        if (!sigint) {
            console.log('Disconnected! Trying to reconnect');
            connectAndSetupEnvironment(this);
        }
    });
    return connectAndSetupEnvironment(thingy);
}

function getCurrentValues() {
    setTimeout(() => {
        deviceShadow.marker = false;
    }, 100);
    return deviceShadow;
}

function isConnected() {
    return connected;
}

function handleCleanup() {
    if (currentThingy) {
        sigint = true;
        console.log('Disabling sensors ...');
        // Environment //
        currentThingy.temperature_disable(console.error);
        currentThingy.pressure_disable(console.error);
        currentThingy.humidity_disable(console.error);
        currentThingy.gas_disable(console.error);
        currentThingy.color_disable(console.error);
        // Motion //
        currentThingy.raw_disable(console.error);
        currentThingy.orientation_disable(console.error);
        currentThingy.tap_disable(console.error);
        currentThingy.quaternion_disable(console.error);
        currentThingy.stepCounter_disable(console.error);
        currentThingy.euler_disable(console.error);
        currentThingy.rotation_disable(console.error);
        currentThingy.heading_disable(console.error);
        currentThingy.gravity_disable(console.error);
        // User Interface //
        currentThingy.button_disable(console.error);
        currentThingy.led_off(console.error);
        console.log('Disconnecting ...');
        currentThingy.disconnect(console.error);
    }
}

module.exports = {
    scan,
    scanByMac,
    renderScanResults,
    questionChooseThingy,
    connect,
    getCurrentValues,
    isConnected,
};
