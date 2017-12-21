import { DynamoDB } from 'aws-sdk';

const { DocumentClient } = DynamoDB;

let options = {};

if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const client = new DocumentClient(options);

export default client;
