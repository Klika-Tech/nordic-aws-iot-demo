import debounce from 'lodash/debounce';
import {
    DEVICE_CONNECTED,
    DEVICE_DISCONNECTED,
} from '../actionTypes';

const checkDisconnect = debounce(notifyDisconnected, 5000);

export function notifyConnected() {
    return (dispatch) => {
        dispatch(connected());
        checkDisconnect(dispatch);
    };
}

function notifyDisconnected(dispatch) {
    dispatch(disconnected());
}

function connected() {
    return {
        type: DEVICE_CONNECTED,
    };
}

function disconnected() {
    return {
        type: DEVICE_DISCONNECTED,
    };
}
