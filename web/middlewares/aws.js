import { AWS_CONNECT, MQTT_DISCONNECTED } from '../actionTypes';
import * as FetchService from '../services/fetch';
import config from '../config';
import { fetchData } from '../actions/data';
import { connect } from '../actions/mqtt';

const awsMiddleware = store => next => (action) => {
    switch (action.type) {
    case AWS_CONNECT:
        FetchService.fetchAwsMetrics(config).then((data) => {
            store.dispatch(fetchData(data));
            identifyAndConnect(store.dispatch, config);
        });
        break;
    case MQTT_DISCONNECTED:
        setTimeout(() => {
            if (config.debug) console.log('MQTT: Reconnect...');
            identifyAndConnect(store.dispatch, config);
        }, 1000);
        break;
    default:
        return next(action);
    }
};

export default awsMiddleware;

function identifyAndConnect(dispatch, conf) {
    FetchService.fetchIotUrl(conf).then((data) => {
        dispatch(connect(data.url, 2147483647));
    });
}
