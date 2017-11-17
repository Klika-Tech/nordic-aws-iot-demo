/**
 * Environment:
 * - OWN_API_KEY - Open Weather Map API key
 * - DYNAMO_DB_WEATHER_TABLE_NAME - DynamoDB table for weather
 * */

const http = require('http');
const dc = require('./common/dynamodb');

exports.handler = (event, context, callback) => {
    const cities = [
        {
            name: 'Minsk',
            id: 625144,
        },
        {
            name: 'New York',
            id: 5128638,
        },
        {
            name: 'Los Angeles',
            id: 5368361,
        },
        {
            name: 'Seattle',
            id: 5809844,
        },
        {
            name: 'Chicago',
            id: 4887398,
        },
        {
            name: 'Washington DC',
            id: 4140963,
        },
        {
            name: 'Miami',
            id: 4164138,
        },
        {
            name: 'San Francisco',
            id: 5391959,
        },
        {
            name: 'London',
            id: 2643743,
        },
        {
            name: 'Madrid',
            id: 3117735,
        },
        {
            name: 'Milan',
            id: 3173435,
        },
        {
            name: 'Rome',
            id: 3169070,
        },
        {
            name: 'Berlin',
            id: 2950158,
        },
        {
            name: 'Prague',
            id: 3067696,
        },
        {
            name: 'Paris',
            id: 2988507,
        },
        {
            name: 'Moscow',
            id: 524901,
        },
    ];

    const cityIds = cities
        .map(d => d.id)
        .reduce((prev, cur) => `${prev},${cur}`);

    const requestUrl =
        `http://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${process.env.OWN_API_KEY}`;

    console.log(`requestUrl: ${requestUrl}`);

    http.get(requestUrl,
        (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                data = JSON.parse(data);

                data = data.list.map(d => ({
                    city: d.id,
                    timestamp: d.dt,
                    temperature: d.main.temp,
                    humidity: d.main.humidity,
                    pressure: d.main.pressure,
                }));

                data.forEach((d) => {
                    const params = {
                        TableName: process.env.DYNAMO_DB_WEATHER_TABLE_NAME,
                        Item: {
                            city: d.city,
                            timestamp: d.timestamp,
                            temperature: d.temperature,
                            humidity: d.humidity,
                            pressure: d.pressure,
                        },
                    };

                    dc.put(params, (err) => {
                        if (err) callback(err);
                    });
                });
            });
        }).on('error', (err) => {
        callback(err);
    });
};
