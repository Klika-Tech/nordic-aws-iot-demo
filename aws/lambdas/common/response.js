/**
 * AWS Lambda PROXY 200 (OK) response formatter.
 * @param json
 * @return {Object}
 */
export function ok(json) {
    return {
        statusCode: 200,
        "headers": {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(json)
    };
}