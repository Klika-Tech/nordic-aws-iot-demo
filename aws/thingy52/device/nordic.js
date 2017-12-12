const readline = require('readline');
const Thingy = require('thingy52');
const forEach = require('lodash/forEach');
const toInteger = require('lodash/toInteger');
const toLower = require('lodash/toLower');
const replace = require('lodash/replace');

const SCAN_WINDOW = 5000;
const SENSOR_INIT_TIMEOUT = 2000;
const TELEMETRY_INTERVAL = 1000;
const MAX_ECO2_LEVEL = 700;
let scanResults = [];
let sigint = false;

let currentThingy = null;

let connected = false;
let gasAlarmEnabled = false;
let currentTemperature = 0;
let currentPressure = 0;
let currentHumidity = 0;
let currentECO2 = 0;
let currentTVOC = 0;
let currentBatteryLevel = 100;

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
                    message: 'Not found any Thingy:52'
                });
            }
        }, SCAN_WINDOW);
    })
}

function scanByMac(mac) {
    console.log(`Searching Thingy:52 by MAC: ${mac}`);
    const id = replace(toLower(mac), new RegExp(':','g'), '');
    return new Promise((resolve, reject) => {
        Thingy.discoverById(id, (thingy) => {
            resolve(thingy);
        });
        setTimeout(() => {
            reject({
                message: `Not found Thingy:52 by id: ${id}`
            });
        }, SCAN_WINDOW);
    })
}

function renderScanResults(things) {
    console.log('Scan results:');
    forEach(things, (item, index) => {
        console.log(`${index+1}) ${item.address}`);
    });
    return Promise.resolve(things);
}

function questionChooseThingy(things) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter number of Thingy:52 from scan: ', (a) => {
            const answer = toInteger(a);
            const isValid = answer >= 1 && answer <= things.length;
            if (!isValid) {
                rl.close();
                reject({
                    message: 'Invalid value. Interrupting.'
                });
            } else {
                const thingy = things[answer-1];
                console.log(`You choose: ${thingy.address}`);
                resolve(thingy);
            }
        });
    });
}

function connectAndSetupEnvironment(thingy) {
    return new Promise((resolve, reject) => {
        thingy.connectAndSetUp((error) => {
            const handleError = (message) => {
                return (error) => {
                    if (error) {
                        reject({
                            message: message + ': ' + error
                        });
                    }
                };
            };
            const setLedAlarm = (isEnabled) => {
                if (!isEnabled) {
                    thingy.led_off();
                } else {
                    thingy.led_breathe({
                        color: 1,
                        intensity: 100,
                        delay: 1000
                    });
                }
            };

            handleError('Connection error')(error);

            if (error) return; else currentThingy = thingy;

            thingy.temperature_interval_set(TELEMETRY_INTERVAL, handleError('Set temperature interval error'));
            thingy.temperature_enable(handleError('Set temperature enable error'));
            thingy.on('temperatureNotif', (metric) => { currentTemperature = metric });

            thingy.pressure_interval_set(TELEMETRY_INTERVAL, handleError('Set pressure interval error'));
            thingy.pressure_enable(handleError('Set pressure enable error'));
            thingy.on('pressureNotif', (metric) => { currentPressure = metric });

            thingy.humidity_interval_set(TELEMETRY_INTERVAL, handleError('Set humidity interval error'));
            thingy.humidity_enable(handleError('Set humidity enable error'));
            thingy.on('humidityNotif', (metric) => { currentHumidity = metric });

            thingy.gas_mode_set(2, handleError('Gas mode set error'));
            thingy.gas_enable(handleError('Gas enable error'));
            thingy.on('gasNotif', (metric) => {
                currentECO2 = metric.eco2;
                currentTVOC = metric.tvoc;
                if (currentECO2 >= MAX_ECO2_LEVEL) {
                    if (!gasAlarmEnabled) {
                        console.log(`[${(new Date()).toISOString()}] Gas Alarm (CO2:${currentECO2}) enabled!`);
                        setLedAlarm(true);
                    }
                    gasAlarmEnabled = true;
                } else {
                    if (gasAlarmEnabled) {
                        console.log(`[${(new Date()).toISOString()}] Gas Alarm (CO2:${currentECO2}) disabled.`);
                        setLedAlarm();
                        gasAlarmEnabled = false;
                    }
                }
            });

            thingy.on('batteryLevelChange', (level) => { currentBatteryLevel = level });
            thingy.notifyBatteryLevel(handleError('Enable battery level error'));

            setLedAlarm(false);

            setTimeout(() => {
                console.log('Connected!');
                connected = true;
                resolve(thingy);
            }, SENSOR_INIT_TIMEOUT);
        });
    });
}

function connect(thingy) {
    thingy.on('disconnect', function() {
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
    return {
        eco2: currentECO2,
        tvoc: currentTVOC,
        temperature: currentTemperature,
        humidity: currentHumidity,
        pressure: currentPressure,
        batteryLevel: currentBatteryLevel
    };
}

function isConnected() {
    return connected;
}

function handleCleanup() {
    if (currentThingy) {
        console.log('Disabling sensors ...');
        currentThingy.temperature_disable(console.error);
        currentThingy.pressure_disable(console.error);
        currentThingy.humidity_disable(console.error);
        currentThingy.gas_disable(console.error);
        currentThingy.led_off();
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
    isConnected
};
