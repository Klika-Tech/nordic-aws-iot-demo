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
