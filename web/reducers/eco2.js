import { ECO2_UPDATE } from '../actionTypes';
import { update } from './common/dimensions';

export default function (state = {}, { type, payload }) {
    switch (type) {
    case ECO2_UPDATE: {
        return update(state, payload);
    }
    default:
        return state;
    }
}
