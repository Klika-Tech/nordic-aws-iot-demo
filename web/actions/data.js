import map from 'lodash/map';
import forEach from 'lodash/forEach';
import last from 'lodash/last';
import { batchActions } from 'redux-batched-actions';
import { DATA_FETCHED, DATA_STATE_RECEIVED } from '../actionTypes';
import { pressureFetch, pressurePush } from './pressure';
import { humidityFetch, humidityPush } from './humidity';
import { temperatureFetch, temperaturePush } from './temperature';
import { eco2Fetch, eco2Push } from './eco2';
import { tvocFetch, tvocPush } from './tvoc';
import { accelerometerFetch, accelerometerPush } from './accelerometer';
import { gyroscopeFetch, gyroscopePush } from './gyroscope';
import { compassFetch, compassPush } from './compass';
import { gravityFetch, gravityPush } from './gravity';
import { headingFetch, headingPush } from './heading';
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
            accelerometerFetch(pd),
            gyroscopeFetch(pd),
            compassFetch(pd),
            gravityFetch(pd),
            headingFetch(pd),
            dataFetch(data.sensorData),
            deviceStateReceived(data.sensorData),
        ]));
    };
}

export function pushData(chunks) {
    return (dispatch, getState) => {
        const pds = chunks.map(prepareDataItem);
        const {
            pressure, humidity, temperature, eco2, tvoc, batteryLevel,
            accelerometer, gyroscope, compass, gravity, heading,
        } = getState();
        dispatch(batchActions([
            pressurePush(pds, pressure),
            humidityPush(pds, humidity),
            temperaturePush(pds, temperature),
            eco2Push(pds, eco2),
            tvocPush(pds, tvoc),
            batteryLevelPush(pds, batteryLevel),
            accelerometerPush(pds, accelerometer),
            gyroscopePush(pds, gyroscope),
            compassPush(pds, compass),
            gravityPush(pds, gravity),
            headingPush(pds, heading),
            deviceStateReceived(chunks),
        ]));
    };
}

function prepareData(data) {
    forEach(data.weatherData, (d) => {
        d.tempData = map(d.tempData, prepareDataItem);
        d.humidityData = map(d.humidityData, prepareDataItem);
        d.pressureData = map(d.pressureData, prepareDataItem);
    });
    return data;
}

function dataFetch(sensorData) {
    return { type: DATA_FETCHED, payload: sensorData };
}

function deviceStateReceived(states) {
    const latest = last(states);
    return {
        type: DATA_STATE_RECEIVED,
        payload: latest,
    };
}

function prepareDataItem(dataItem) {
    const restricted = {
        timestamp: dataItem.timestamp === undefined
            ? Math.round(Date.now() / 1000)
            : +dataItem.timestamp,
        marker: dataItem.marker,
    };

    if (dataItem.temperature !== undefined) restricted.temperature = parseFloat(dataItem.temperature);
    if (dataItem.humidity !== undefined) restricted.humidity = parseFloat(dataItem.humidity);
    if (dataItem.pressure !== undefined) restricted.pressure = parseFloat(dataItem.pressure);

    return {
        ...dataItem,
        ...restricted,
    };
}
