/**
 * Environment:
 * - AWS_REGION - current AWS region
 * - COGNITO_POOL - AWS Cognito federation pool id
 * */

import { CognitoIdentityCredentials } from 'aws-sdk';
import { getSignedUrl } from './common/sigv4';

exports.handler = (event, context, callback) => {
    if (process.env.IS_OFFLINE) {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ url: 'ws://127.0.0.1:1883' }), // local mosquitto over websockets
        });
        return;
    }
    const region = process.env.AWS_REGION;
    const credentials = new CognitoIdentityCredentials({
        IdentityPoolId: process.env.COGNITO_POOL
    });
    credentials.get((err) => {
        if (err) {
            callback(err);
            return;
        }
        const url = getSignedUrl(
            'wss',
            `data.iot.${region}.amazonaws.com`,
            '/mqtt',
            'iotdevicegateway',
            region,
            credentials.accessKeyId,
            credentials.secretAccessKey,
            credentials.sessionToken
        );
        const response = {
            statusCode: 200,
            "headers": {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ url })
        };
        callback(null, response);
    });
};
