import 'whatwg-fetch';

/**
 * Load aws metrics for the last 4h
 * @param apiUrl
 * @return {*|Promise.<Object>}
 */
export function fetchAwsMetrics({ fetchApiUrl }) {
    const since = Math.round(Date.now() / 1000) - 14400;
    return fetch(`${fetchApiUrl}?since=${since}`)
        .then(response => response.json());
}

/**
 * Load load pre-signed wss url for AWS IoT
 * @param iotPresignedApiUrl
 * @return {*|Promise.<Object>}
 */
export function fetchIotUrl({ iotPresignedApiUrl }) {
    return fetch(iotPresignedApiUrl).then(response => response.json());
}
