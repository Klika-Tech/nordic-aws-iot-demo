/**
 * Generate preassigned urls for access to AWS IoT
 * TODO: Security
 * */

const aws = require('aws-sdk');
const v4 = require('aws-signature-v4');
const crypto = require('crypto');

exports.handler = (event, context, callback) => {
    if (process.env.IS_OFFLINE) {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ url: 'ws://127.0.0.1:1883' }), // local mosquitto over websockets
        });
        return;
    }

    const iot = new aws.Iot();
    iot.describeEndpoint((err, data) => {
        if (!err) {
            const url = v4.createPresignedURL(
                'GET',
                data.endpointAddress,
                '/mqtt',
                'iotdevicegateway',
                crypto.createHash('sha256').update('', 'utf8').digest('hex'),
                {
                    protocol: 'wss',
                }
            );
            const response = {
                statusCode: 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({ url }),
            };
            callback(null, response);
        } else {
            callback(err);
        }
    });
};
