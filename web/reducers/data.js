import filter from 'lodash/filter';
import last from 'lodash/last';
import get from 'lodash/get';
import { DATA_FETCHED, DATA_STATE_RECEIVED } from '../actionTypes';

const INITIAL_STATE = {
    fetched: false,
    shadow: {},
};

function getLastMarked(sensorData) {
    return last(filter(sensorData, d => get(d, 'marker')));
}

function setLastMarked(state, payload) {
    const m = getLastMarked(payload);
    if (m) {
        state.shadow.marked = m.timestamp ? m.timestamp * 1000 : Date.now();
    }
    return state;
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
    case DATA_FETCHED: {
        const newState = {
            ...state,
            fetched: true,
        };
        return setLastMarked(newState, action.payload);
    }
    case DATA_STATE_RECEIVED: {
        const newState = {
            ...state,
            shadow: {
                ...state.shadow,
                ...action.payload,
            },
        };
        return setLastMarked(newState, [action.payload]);
    }
    default:
        return state;
    }
}
