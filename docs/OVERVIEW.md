Overview
=============

The platform demonstrates a [Nordic Thingy:52](https://www.nordicsemi.com/eng/Products/Nordic-Thingy-52) with [AWS IoT](https://aws.amazon.com/iot/) integration use case.

##### Contents

- [Platform Scheme](#platform-scheme)
- [Components](#components)

### Platform Scheme

<p align="left">
  <img src="./assets/schema.png" atl="Nordic Thingy Demo Platform Scheme" />
</p>

### Components

- [Nordic Thingy:52](./DEVICE.md) - The board is a "thing" for the AWS IoT service. It updates its shadow with the sensors data every few seconds. 
- [BLE MQTT Router](./ROUTER.md) - Local MQTT bridge from local [IPv6](https://en.wikipedia.org/wiki/IPv6) network to AWS IoT.
- [AWS Serverless Full-Stack](./AWS.md) - Back-end and front-end (SPA) running on [AWS](https://aws.amazon.com/), deployment provided via [serverless](https://serverless.com/).
