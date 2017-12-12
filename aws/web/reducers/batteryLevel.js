import { BATTERY_UPDATE } from '../actionTypes';
import { update } from './common/dimensions';

export default function (state = {}, { type, payload }) {
    switch (type) {
    case BATTERY_UPDATE: {
        return update(state, payload);
    }
    default:
        return state;
    }
}
