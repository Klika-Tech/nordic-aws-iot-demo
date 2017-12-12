import get from 'lodash/get';
import { getActualData } from '../common/utils';

export function prepareDataItem(type) {
    return item => ({
        [type]: item[type],
        date: new Date(item.timestamp * 1000),
        marker: item.marker,
    });
}

export function fetch(type, key) {
    const pdi = prepareDataItem(key);
    return (fullData) => {
        const items = get(fullData, 'sensorData', []);
        const data = items.map(pdi);
        return {
            type,
            payload: { data },
        };
    };
}

export function push(type, key) {
    const pdi = prepareDataItem(key);
    return (chunks, state) => {
        let data = get(state, 'data', []);
        data = data.concat(chunks.map(pdi));
        data = getActualData(data);
        return {
            type,
            payload: {
                data,
            },
        };
    };
}
