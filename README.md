Nordic Thingy Demo Platform
=============

The platform demonstrates an [Nordic Thingy:52](https://www.nordicsemi.com/eng/Products/Nordic-Thingy-52) and [AWS](https://aws.amazon.com) integration use case.
The [back-end and front-end](docs/AWS.md) is entirely powered by [Amazon Web Services](https://aws.amazon.com/).
The [device](./docs/DEVICE.md) send metrics over MQTT (IPv6) to AWS IoT via [BLE MQTT Router](docs/ROUTER.md).

You can see the live demo [here](http://nordic-dev-serverless-site-s3.s3-website.eu-central-1.amazonaws.com/#/dashboard).

##### Contents

- [Overview](doc/OVERVIEW.md)
	- [Platform Scheme](doc/OVERVIEW.md#platform-scheme)
	- [Components](doc/OVERVIEW.md#components)
- [AWS Serverless Full-Stack](docs/AWS.md)
	- [Features](docs/AWS.md#features)
    - [Requirements](docs/AWS.md#requirements)
    - [Back-end](docs/AWS.md#back-end)
    - [Front-end](docs/AWS.md#front-end)
    - [Setup](docs/AWS.md#setup)
    - [Deploy](docs/AWS.md#deploy)
    - [Offline Development](docs/AWS.md#offline-development)
    - [Device Simulation](docs/AWS.md#device-simulation)
- [Device (Nordic Thingy:52)](docs/DEVICE.md)
	- [Hardware configuration](docs/DEVICE.md#hardware-configuration)
    - [Build Instruction](docs/DEVICE.md#connecting-to-ble-router)
    - [Code Highlights](docs/DEVICE.md#code-highlights)
    - [J-Link Connection Setup](docs/DEVICE.md#j-link-connection-setup)
    - [Debugging setup](docs/DEVICE.md#debugging-setup)
- [BLE MQTT Router](docs/ROUTER.md)
    - [Requirements](docs/ROUTER.md#requirements)
    - [Setup bridge to AWS IoT](docs/ROUTER.md#requirements)
    - [Workflow](docs/ROUTER.md#workflow)
   	
##### External Resources

- Build Tools
	- [Node.js](https://nodejs.org/en/)
	- [Webpack](https://webpack.github.io/)
	- [Serverless](https://serverless.com/)
- Libraries and SDK
    - [nRF5 SDK for IoT](https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF5-SDK-for-IoT)
	- [React.js](https://facebook.github.io/react/)
	- [D3.js](https://d3js.org/)
	- [MQTT.js](https://github.com/mqttjs/MQTT.js)
	- [AWS SDK for Browser](https://aws.amazon.com/sdk-for-browser/)
	- [AWS SDK for Node.js](https://aws.amazon.com/sdk-for-node-js/)
- Core Modules
	- [bluetooth_6lowpan](https://wiki.openwrt.org/doc/howto/bluetooth.6lowpan)
- CLI Tools
	- [AWS CLI](https://aws.amazon.com/cli/)
- Daemons
	- [Mosquitto](https://mosquitto.org/)
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