AWS Serverless Full-Stack
=============

Back-end (AWS-base) and front-end (SPA) running on [AWS](https://aws.amazon.com/), deployment provided via [serverless](https://serverless.com/). <br/> [serverless.yml](../aws/serverless.yml) - [serverless](https://serverless.com/) template provide all resources for setup cloud and [BLE mqtt router](../ble_mqtt_router).

##### Contents

- [Features](#features)
- [Requirements](#requirements)
- [Back-end](#back-end)
- [Front-end](#front-end)
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

### Back-end

The back-end is entirely powered by [Amazon Web Services](https://aws.amazon.com/). See [platform schema](./OVERVIEW.md#platform-scheme). If you don't have an AWS account, create one. Amazon provides the [AWS Free Tier](https://aws.amazon.com/free/) for new accounts. Demo platform is lightweight and should fit into the free tier limits.

### Front-end

It is a [React](https://facebook.github.io/react/) application which renders the board sensors data as [D3.js](https://d3js.org/) charts. On the application start initial data set is fetched from a public API endpoint. 
By default data for last 4 hours is rendered. Charts are updated in real time using data coming from Cloud via MQTT over Websocket protocol. They have two visualization modes: line and area.
Here are links to dashboard [source code](../aws/web) and [live demo](http://nordic-dev-serverless-site-s3.s3-website.eu-central-1.amazonaws.com/#/dashboard). 

### Setup

1. Clone repository
1. Go to project subdirectory [aws](../aws) 
1. Install dependencies, run CLI command `npm install` 
1. Copy [config.sample.yml](../aws/config.sample.yml) to `config.dev.yml` and set your own settings. _Note: Replace OWN_API_KEY in `config.dev.yml` for valid [Open Weather Map API Key](https://openweathermap.org/appid)_
1. Setup local dependencies (serverless-local-dynamo), run `npm run setup`

### Deploy

1. Go to project subdirectory [aws](../aws) 
1. Deploy back-end to AWS, run `npm run deploy:sls` 
1. Deploy front-end to S3, run `npm run deploy:spa`

### Offline Development

_Note: For local AWS IoT we use [BLE mqtt router](../ble_mqtt_router), setup on local machine with enabled websocket protocol (127.0.0.1:1883), without auth_

1. Go to project subdirectory [aws](../aws) 
1. Start local development server, run `npm run offline`

### Device Simulation

_Note: Current version of device simulator is AWS-based, you should deploy serverless stack before launch._

1. Go to project subdirectory [aws](../aws) 
1. Launch simulator, run `npm run simulator:device:aws`

### External Resources

- Build Tools
	- [Node.js](https://nodejs.org/en/)
	- [Webpack](https://webpack.github.io/)
	- [Serverless](https://serverless.com/)
    - [Eclipse IDE for GNU ARM & RISC-V C/C++ Developers](https://gnu-mcu-eclipse.github.io/)
    - [Segger J-Link Software](https://www.segger.com/downloads/jlink/#J-LinkSoftwareAndDocumentationPack)
    - [nRF5x Command Line Tools](https://www.nordicsemi.com/eng/nordic/Products/nRF51822/nRF5x-Command-Line-Tools-Win32/33444)
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
