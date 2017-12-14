import _ from 'lodash';
import { batchActions } from 'redux-batched-actions';
import { DATA_FETCHED } from '../actionTypes';
import { pressureFetch, pressurePush } from './pressure';
import { humidityFetch, humidityPush } from './humidity';
import { temperatureFetch, temperaturePush } from './temperature';
import { eco2Fetch, eco2Push } from './eco2';
import { tvocFetch, tvocPush } from './tvoc';
import { batteryLevelFetch, batteryLevelPush } from './batteryLevel';

export function fetchData(data) {
    return (dispatch) => {
        const pd = prepareData(data);
        dispatch(batchActions([
            pressureFetch(pd),
            humidityFetch(pd),
            temperatureFetch(pd),
            eco2Fetch(pd),
            tvocFetch(pd),
            batteryLevelFetch(pd),
            { type: DATA_FETCHED },
        ]));
    };
}

export function pushData(chunks) {
    return (dispatch, getState) => {
        const pds = chunks.map(prepareDataItem);
        const { pressure, humidity, temperature, eco2, tvoc, batteryLevel } = getState();
        dispatch(batchActions([
            pressurePush(pds, pressure),
            humidityPush(pds, humidity),
            temperaturePush(pds, temperature),
            eco2Push(pds, eco2),
            tvocPush(pds, tvoc),
            batteryLevelPush(pds, batteryLevel),
        ]));
    };
}

function prepareData(data) {
    _.forEach(data.weatherData, (d) => {
        d.tempData = _.map(d.tempData, prepareDataItem);
        d.humidityData = _.map(d.humidityData, prepareDataItem);
        d.pressureData = _.map(d.pressureData, prepareDataItem);
    });
    return data;
}

function prepareDataItem(dataItem) {
    const result = {
        timestamp: dataItem.timestamp === undefined
            ? Math.round(Date.now() / 1000)
            : +dataItem.timestamp,
        marker: dataItem.marker,
    };

    if (dataItem.temperature !== undefined) result.temperature = parseFloat(dataItem.temperature);
    if (dataItem.humidity !== undefined) result.humidity = parseFloat(dataItem.humidity);
    if (dataItem.pressure !== undefined) result.pressure = parseFloat(dataItem.pressure);
    if (dataItem.magnetometer !== undefined) result.magnetometer = dataItem.magnetometer;
    if (dataItem.accelerometer !== undefined) result.accelerometer = dataItem.accelerometer;
    if (dataItem.gyroscope !== undefined) result.gyroscope = dataItem.gyroscope;
    if (dataItem.eco2 !== undefined) result.eco2 = parseFloat(dataItem.eco2);
    if (dataItem.tvoc !== undefined) result.tvoc = parseFloat(dataItem.tvoc);
    if (dataItem.batteryLevel !== undefined) result.batteryLevel = parseFloat(dataItem.batteryLevel);

    return result;
}
