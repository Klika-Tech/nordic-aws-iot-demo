const aws = require('aws-sdk');

const PUBLISH_INTERVAL = 2000;

function getStackInfo() {
    return require('../../.serverless/stack.json');
}

function iotInit() {
    return new Promise((resolve, reject) => {
        try {
            const stack = getStackInfo();
            const iot = new aws.Iot({ region: stack.Region });
            iot.describeEndpoint((err, data) => {
                if (err) { reject(err); }
                const iotData = new aws.IotData({
                    region: stack.Region,
                    endpoint: data.endpointAddress,
                });
                console.log('AWS IoT connection success!');
                resolve(iotData);
            });
        } catch (e) {
            console.warn('Can\'t find a serverless stack info. You should deploy stack first!');
            reject(e);
        }
    });
}

function startPublishLoop(isConnectedCb, getDataCb) {
    return iotData => new Promise((resolve, reject) => {
        try {
            const stack = getStackInfo();
            const topic = `$aws/things/${stack.ThingName}/shadow/update`;
            const interval = setInterval(() => {
                if (isConnectedCb()) {
                    const params = {
                        topic,
                        payload: JSON.stringify({
                            state: {
                                reported: getDataCb(),
                            },
                        }),
                    };
                    iotData.publish(params, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log('Publish to AWS IoT:', params);
                        }
                    });
                }
            }, PUBLISH_INTERVAL);
            setTimeout(() => { resolve(interval); }, PUBLISH_INTERVAL);
        } catch (e) {
            console.warn('Can\'t find a serverless stack info. You should deploy stack first!');
            reject(e);
        }
    });
}

module.exports = {
    iotInit,
    startPublishLoop,
};
