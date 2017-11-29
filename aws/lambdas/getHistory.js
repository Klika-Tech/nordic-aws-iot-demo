/**
 * Environment:
 * - THING_NAME - IoT thing name
 * - DYNAMO_DB_METRICS_TABLE_NAME - Dynamo DB metrics table name
 * - DYNAMO_DB_METRICS_TABLE_KEY - Dynamo DB metrics table key
 * - DYNAMO_DB_WEATHER_TABLE_NAME - Dynamo DB weather table name
 * */

import get from 'lodash/get';
import toInteger from 'lodash/toInteger';
import dc from './common/dynamodb';
import { ok } from './common/response';

exports.handler = (event, context, callback) => {
    const thingName = process.env.THING_NAME;
    const metricsTableName = process.env.DYNAMO_DB_METRICS_TABLE_NAME;
    const weatherTableName = process.env.DYNAMO_DB_WEATHER_TABLE_NAME;
    const metricsTableKey = process.env.DYNAMO_DB_METRICS_TABLE_KEY;

    const defaultSince = Math.round((Date.now() - 4 * 60 * 60 * 1000) / 1000);
    const since = toInteger(get(event, "queryStringParameters.since", defaultSince));

    console.log('since:', since);

    const metricsQueryParams = {
        TableName: metricsTableName,
        KeyConditionExpression: `${metricsTableKey} = :m AND #ts >= :since`,
        ExpressionAttributeNames: {
            '#ts': 'timestamp',
        },
        ExpressionAttributeValues: {
            ':m': thingName,
            ':since': since,
        },
        ScanIndexForward: false,
        Limit: 40000,
    };

    queryDb(metricsQueryParams, []);


    function queryDb(params, acc) {
        dc.query(params, (err, data) => {
            if (err) {
                callback(err);
                return;
            }

            acc = acc.concat(data.Items);

            if (data.LastEvaluatedKey) {
                if (acc.length) {
                    params.KeyConditionExpression = `${metricsTableKey} = :m AND #ts BETWEEN :since AND :lastts`;
                    params.ExpressionAttributeValues = {
                        ':m': thingName,
                        ':since': since,
                        ':lastts': (acc[acc.length - 1].timestamp - 1),
                    };
                    queryDb(params, acc);
                } else {
                    processResult([]);
                }
            } else processResult(acc);
        });
    }


    function processResult(items) {
        const sensorData = items.reverse().map((x) => {
            const result = {
                timestamp: parseInt(x.timestamp, 10),
            };

            const metrics = ['temperature', 'humidity', 'pressure', 'accelerometer', 'gyroscope', 'magnetometer'];

            metrics.forEach((metric) => {
                if (x.payload[metric] !== undefined) { result[metric] = x.payload[metric]; }
            });

            if (x.payload.marker !== undefined && x.payload.marker) result.marker = true;

            return result;
        });

        const cities = [
            { name: 'Minsk', id: 625144 },
            { name: 'New York', id: 5128638 },
            { name: 'Los Angeles', id: 5368361 },
            { name: 'Seattle', id: 5809844 },
            { name: 'Chicago', id: 4887398 },
            { name: 'Washington DC', id: 4140963 },
            { name: 'Miami', id: 4164138 },
            { name: 'San Francisco', id: 5391959 },
            { name: 'London', id: 2643743 },
            { name: 'Madrid', id: 3117735 },
            { name: 'Milan', id: 3173435 },
            { name: 'Rome', id: 3169070 },
            { name: 'Berlin', id: 2950158 },
            { name: 'Prague', id: 3067696 },
            { name: 'Paris', id: 2988507 },
            { name: 'Moscow', id: 524901 },
        ];

        const weatherData = [];

        const goThroughCities = function () {
            const city = cities.shift();

            const weatherQueryParams = {
                TableName: weatherTableName,
                KeyConditionExpression: 'city = :c AND #ts >= :ts',
                ExpressionAttributeNames: {
                    '#ts': 'timestamp',
                },
                ExpressionAttributeValues: {
                    ':c': city.id,
                    ':ts': since,
                },
                ScanIndexForward: false,
                Limit: 10000,
            };

            dc.query(weatherQueryParams, (err, data) => {
                if (err) { callback(err); return; }

                data.Items.reverse();

                weatherData.push({
                    cityName: city.name,
                    cityId: city.id,
                    tempData: data.Items.map(x => ({
                        timestamp: x.timestamp,
                        temperature: x.temperature,
                    })),
                    humidityData: data.Items.filter(x => x.humidity !== undefined).map(x => ({
                        timestamp: x.timestamp,
                        humidity: x.humidity,
                    })),
                    pressureData: data.Items.filter(x => x.pressure !== undefined).map(x => ({
                        timestamp: x.timestamp,
                        pressure: x.pressure,
                    })),
                });

                if (!cities.length) {
                    callback(null, ok({ sensorData, citiesData: weatherData }));
                } else goThroughCities();
            });
        };

        goThroughCities();
    }
};
