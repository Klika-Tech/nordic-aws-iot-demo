const isArray = require('lodash/isArray');
const isObject = require('lodash/isObject');
const round = require('lodash/round');
const mapValues = require('lodash/mapValues');

function deviateSensor(sensorConfig, currentValue) {
    if (currentValue === undefined) currentValue = sensorConfig.initial;

    if (isArray(currentValue)) {
        return currentValue.map(v => deviateSensor(sensorConfig, v));
    }

    if (isObject(currentValue)) {
        return mapValues(currentValue, v => deviateSensor(sensorConfig, v));
    }

    let newValue = currentValue;

    const rnd = Math.random();
    let shift = sensorConfig.maxDelta;

    if (currentValue > sensorConfig.max) shift *= 2;
    else if (currentValue < sensorConfig.min) shift *= -2;

    if (rnd < 0.3) newValue = newValue + round(Math.random(), 2) * sensorConfig.maxDelta * 2 - shift;

    const r = sensorConfig.round || false;

    if (r) {
        newValue = round(newValue);
    }

    return newValue;
}

const sensorsConfig = {
    temperature: {
        initial: 20,
        maxDelta: 0.03,
        min: -20,
        max: 40,
    },
    humidity: {
        initial: 60,
        maxDelta: 0.03,
        min: 10,
        max: 99,
    },
    pressure: {
        initial: 1000,
        maxDelta: 0.1,
        min: 800,
        max: 1060,
    },
    eco2: {
        initial: 700,
        round: true,
        maxDelta: 5,
        min: 400,
        max: 1000,
    },
    tvoc: {
        initial: 0,
        round: true,
        maxDelta: 1,
        min: 0,
        max: 300,
    },
    batteryLevel: {
        initial: 80,
        round: true,
        fix: 0,
        maxDelta: 0.1,
        min: 0,
        max: 100,
    },
    accelerometer: {
        initial: [0, 0, 1],
        maxDelta: 0.5,
        min: -3,
        max: 3,
    },
    gyroscope: {
        initial: [0, 0, 0],
        maxDelta: 5,
        min: -100,
        max: 100,
    },
    compass: {
        initial: [0, 0, 0],
        maxDelta: 5,
        min: -100,
        max: 100,
    },
    gravity: {
        initial: [-0.5, -0.1, 0.5],
        maxDelta: 0.005,
        min: -0.6,
        max: 0.6,
    },
    color: {
        initial: {
            red: 120,
            green: 60,
            blue: 20,
        },
        round: true,
        maxDelta: 5,
        min: 0,
        max: 255,
    },
    orientation: {
        initial: 0,
        round: true,
        maxDelta: 1,
        min: 0,
        max: 3,
    },
    tap: {
        initial: {
            direction: 0,
            count: 0,
        },
        round: true,
        maxDelta: 1,
        min: 0,
        max: 3,
    },
    quaternion: {
        initial: {
            x: 0,
            y: 0,
            z: 0,
            w: 0,
        },
        maxDelta: 0.1,
        min: -3,
        max: 3,
    },
    stepCounter: {
        initial: {
            steps: 0,
            time: 0,
        },
        round: true,
        maxDelta: 1,
        min: 0,
        max: 1000,
    },
    euler: {
        initial: {
            roll: -0.710784912109375,
            pitch: 0.7258148193359375,
            yaw: 7.2629241943359375,
        },
        round: true,
        maxDelta: 1,
        min: 0,
        max: 1000,
    },
    rotation: {
        initial: {
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
        maxDelta: 0.1,
        min: -3,
        max: 3,
    },
    heading: {
        initial: 0,
        maxDelta: 1,
        min: 0,
        max: 360,
    },
};


module.exports = {
    deviateSensor,
    sensorsConfig,
};
