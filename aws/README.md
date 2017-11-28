AWS Serverless Full-Stack
=============

Back-end (AWS-base) and front-end (SPA) running on [AWS](https://aws.amazon.com/), deployment provided via [serverless](https://serverless.com/). <br/> [serverless.yml](./serverless.yml) - [serverless](https://serverless.com/) template provide all resources for setup cloud and [BLE mqtt router](../ble_mqtt_router).

##### Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Deploy](#deploy)
- [Offline Development](#offline-development)
- [Device Simulation](#device-simulation)
- [External Resources](#external-resources)

### Features

1. Template of back-end IoT application based on [AWS](https://aws.amazon.com/)
1. Web-dashboard for display 
1. Automation of deployment process
1. Local (offline) development without deploying in the cloud.  

### Requirements

1. [aws cli](https://aws.amazon.com/cli/) should be available in the system. See [configuration guide](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
1. [Node.js 8+](https://nodejs.org/en/) should be available in the system. See [setup guide](https://github.com/creationix/nvm#installation).

### Setup

1. Clone repository
1. Go to project subdirectory `aws` 
1. Install dependencies, run CLI command `npm install` 
1. Copy [config.sample.yml](./config.sample.yml) to `config.dev.yml` and set your own settings. _Note: Replace OWN_API_KEY in `config.dev.yml` for valid [Open Weather Map API Key](https://openweathermap.org/appid)_
1. Setup local dependencies (serverless-local-dynamo), run `npm run setup`

### Deploy

1. Go to project subdirectory `aws` 
1. Deploy back-end to AWS, run `npm run deploy:sls` 
1. Deploy front-end to S3, run `npm run deploy:spa` 

### Offline Development

_Note: For local AWS IoT we use [BLE mqtt router](../ble_mqtt_router), setup on local machine with enabled websocket protocol (127.0.0.1:1883), without auth_

1. Go to project subdirectory `aws` 
1. Start local development server, run `npm run offline`

### Device Simulation

_Note: Current version of device simulator is AWS-based, you should deploy serverless stack before launch._

1. Go to project subdirectory `aws` 
1. Launch simulator, run `npm run simulator:device:aws`

### External Resources

- Build Tools
	- [Node.js](https://nodejs.org/en/)
	- [Webpack](https://webpack.github.io/)
	- [Serverless](https://serverless.com/)
- Libraries
	- [React.js](https://facebook.github.io/react/)
	- [D3.js](https://d3js.org/)
	- [MQTT.js](https://github.com/mqttjs/MQTT.js)
	- [AWS SDK for Browser](https://aws.amazon.com/sdk-for-browser/)
	- [AWS SDK for Node.js](https://aws.amazon.com/sdk-for-node-js/)
- Cloud Services
	- [AWS IoT](https://aws.amazon.com/iot/)
	- [AWS Lambda](https://aws.amazon.com/lambda/) 
	- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)
	- [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
	- [Amazon CloudWatch](http://aws.amazon.com/cloudwatch/)
	- [Amazon Cognito](http://aws.amazon.com/cognito/)
	- [Amazon S3](http://aws.amazon.com/s3/)
    - [AWS CloudFormation](https://aws.amazon.com/cloudformation/)
	- [OpenWeatherMap API](http://openweathermap.org/)
