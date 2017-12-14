
function deviateSensor(sensorConfig, currentValue) {

    if (currentValue === undefined) currentValue = sensorConfig.initial;

    if (Array.isArray(currentValue)) {
        return currentValue.map(v => deviateSensor(sensorConfig, v));
    }

    let newValue = currentValue;

    const rnd = Math.random();
    let shift = sensorConfig.maxDelta;

    if (currentValue > sensorConfig.max) shift *= 2;
    else if (currentValue < sensorConfig.min) shift *= -2;

    if (rnd < .3) newValue = newValue + Math.random() * sensorConfig.maxDelta * 2 - shift;

    return newValue;
}

const sensorsConfig = {
    temperature: {
        initial: 20,
        maxDelta: .03,
        min: -20,
        max: 40
    },
    humidity: {
        initial: 60,
        maxDelta: .03,
        min: 10,
        max: 99
    },
    pressure: {
        initial: 1000,
        maxDelta: .1,
        min: 800,
        max: 1060
    },
    eco2: {
        initial: 700,
        maxDelta: 5,
        min: 700,
        max: 1000
    },
    tvoc: {
        initial: 0,
        maxDelta: 1,
        min: 0,
        max: 300
    },
    batteryLevel: {
        initial: 80,
        maxDelta: .1,
        min: 0,
        max: 100
    }
};


module.exports = {
    deviateSensor,
    sensorsConfig
};