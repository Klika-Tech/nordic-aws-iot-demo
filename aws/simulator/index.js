/**
 * Snippet for emulation of device code snippet
 * */

const awsRegion = process.env.AWS_REGION || "eu-central-1";
const thingName = process.env.THING_NAME || "nordic_thingy_52_simulator";
const metricsTableName = process.env.DYNAMO_DB_METRICS_TABLE_NAME || "nordic_metrics";
const metricsTableKey = process.env.DYNAMO_DB_METRICS_TABLE_KEY || "thing";

const aws = require("aws-sdk");
const dc = new aws.DynamoDB.DocumentClient({ region: awsRegion });
const iot = new aws.Iot({ region: awsRegion });

const sensors = {
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
    }
};

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

const handler = () => {

    iot.describeEndpoint((err, data) => {
        if (err) {
            console.log("IoT error:", err);
            process.exit(1);
        }

        console.log("Simulator running.");

        const iotData = new aws.IotData({
            region: awsRegion,
            endpoint: data.endpointAddress
        });

        const params = {
            TableName: metricsTableName,
            KeyConditionExpression: `${metricsTableKey} = :m`,
            ExpressionAttributeValues: {
                ":m": thingName,
            },
            ScanIndexForward: false,
            Limit: 1
        };

        dc.query(params, (err, data) => {

            if (err) {
                console.log("Dynamo error:", err);
                process.exit(1);
            }

            let newSensorValues = {};

            for (let sensor in sensors) {
                const sensorConfig = sensors[sensor];
                const firstItem = data.Items[0];
                const sensorData =  (firstItem) ? firstItem.payload[sensor] : sensorConfig.initial;
                newSensorValues[sensor] = deviateSensor(sensorConfig, sensorData);
            }

            let params = {
                topic: "aws/things/"+thingName+"/shadow/update",
                payload: JSON.stringify({
                    state: {
                        reported: newSensorValues
                    }
                })
            };

            iotData.publish(params, err => {
                if (err) {
                    console.log("IoT Data error:", err);
                    process.exit(1);
                } else {
                    console.log("IoT Data publish success:", params);
                    process.exit(0);
                }
            });
        });

    });

};

handler();