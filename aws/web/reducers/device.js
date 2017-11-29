import {
    DEVICE_CONNECTED,
    DEVICE_DISCONNECTED,
} from '../actionTypes';

export default function (state = {}, { type }) {
    switch (type) {
    case DEVICE_CONNECTED: {
        return { connected: true };
    }
    case DEVICE_DISCONNECTED: {
        return { connected: false };
    }
    default:
        return state;
    }
}
