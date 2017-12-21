/* eslint-disable guard-for-in */
/**
 * Nordic Thingy 52 Simulator (AWS version)
 * */

const aws = require('aws-sdk');
const toInteger = require('lodash/toInteger');
const get = require('lodash/get');
const common = require('./common');
const stack = require('../../.serverless/stack.json');

const interval = toInteger(process.env.INTERVAL) || 2000;

const awsRegion = stack.Region;
const thingName = stack.ThingName;
const metricsTableName = stack.MetricsTableName;
const metricsTableKey = stack.MetricsTableKey;

const dc = new aws.DynamoDB.DocumentClient({ region: awsRegion });
const iot = new aws.Iot({ region: awsRegion });

iot.describeEndpoint((error, data) => {
    if (error) {
        console.log('IoT error:', error);
        process.exit(1);
    }

    console.log('Simulator running.');

    const iotData = new aws.IotData({
        region: awsRegion,
        endpoint: data.endpointAddress,
    });

    const params = {
        TableName: metricsTableName,
        KeyConditionExpression: `${metricsTableKey} = :m`,
        ExpressionAttributeValues: {
            ':m': thingName,
        },
        ScanIndexForward: false,
        Limit: 1,
    };

    setInterval(simulate, interval);

    function simulate() {
        dc.query(params, (err, result) => {
            if (err) {
                console.log('Dynamo error:', err);
                process.exit(1);
            }

            const newSensorValues = {};

            for (const sensor in common.sensorsConfig) {
                const sensorConfig = common.sensorsConfig[sensor];
                const firstItem = result.Items[0];
                const sensorData = (firstItem) ? firstItem.payload[sensor] : sensorConfig.initial;
                newSensorValues[sensor] = common.deviateSensor(sensorConfig, sensorData);
            }

            const message = {
                topic: `$aws/things/${thingName}/shadow/update`,
                payload: JSON.stringify({
                    state: {
                        reported: newSensorValues,
                    },
                }),
            };

            iotData.getThingShadow({ thingName }, (getErr, res) => {
                if (getErr) {
                    console.log(getErr, getErr.stack); // an error occurred
                    return;
                }

                const currentTs = Math.round(new Date().getTime() / 1000);
                const shadowDoc = JSON.parse(res.payload);
                const connectedTs = get(shadowDoc, 'metadata.reported.connected.timestamp');
                const isNordicDisconnected = (currentTs - connectedTs) > 5;

                console.log('>>>>>>', currentTs, connectedTs, (currentTs - connectedTs), '<<<<<<<<');

                if (isNordicDisconnected) {
                    iotData.publish(message, (pubErr) => {
                        if (pubErr) {
                            console.log('IoT Data error:', pubErr);
                            process.exit(1);
                        } else {
                            console.log('IoT Data publish success:', message);
                        }
                    });
                } else {
                    console.log('Skip sending telemetry.');
                }
            });
        });
    }
});

