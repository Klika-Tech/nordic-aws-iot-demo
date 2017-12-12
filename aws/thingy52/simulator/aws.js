/**
 * Nordic Thingy 52 Simulator (AWS version)
 * */

const aws = require('aws-sdk');
const toInteger = require('lodash/toInteger');
const common = require('./common');
const stack = require('../../.serverless/stack.json');

const interval = toInteger(process.env.INTERVAL) || 3000;

const awsRegion = stack.Region;
const thingName = stack.ThingName;
const metricsTableName = stack.MetricsTableName;
const metricsTableKey = stack.MetricsTableKey;

const dc = new aws.DynamoDB.DocumentClient({ region: awsRegion });
const iot = new aws.Iot({ region: awsRegion });

iot.describeEndpoint((err, data) => {
    if (err) {
        console.log('IoT error:', err);
        process.exit(1);
    }

    console.log('Simulator running.');

    const iotData = new aws.IotData({
        region: awsRegion,
        endpoint: data.endpointAddress
    });

    const params = {
        TableName: metricsTableName,
        KeyConditionExpression: `${metricsTableKey} = :m`,
        ExpressionAttributeValues: {
            ':m': thingName,
        },
        ScanIndexForward: false,
        Limit: 1
    };

    setInterval(simulate, interval);

    function simulate() {
        dc.query(params, (err, data) => {
            if (err) {
                console.log('Dynamo error:', err);
                process.exit(1);
            }

            let newSensorValues = {};

            for (let sensor in common.sensorsConfig) {
                const sensorConfig = common.sensorsConfig[sensor];
                const firstItem = data.Items[0];
                const sensorData =  (firstItem) ? firstItem.payload[sensor] : sensorConfig.initial;
                newSensorValues[sensor] = common.deviateSensor(sensorConfig, sensorData);
            }

            let params = {
                topic: 'aws/things/'+thingName+'/shadow/update',
                payload: JSON.stringify({
                    state: {
                        reported: newSensorValues
                    }
                })
            };

            iotData.publish(params, err => {
                if (err) {
                    console.log('IoT Data error:', err);
                    process.exit(1);
                } else {
                    console.log('IoT Data publish success:', params);
                }
            });
        });
    }

});

