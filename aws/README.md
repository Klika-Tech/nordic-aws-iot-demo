## AWS Serverless Full-Stack

Back-end and front-end running on [AWS](https://aws.amazon.com/), deployment provided via [serverless](https://serverless.com/).

[serverless.yml](./serverless.yml) - [serverless](https://serverless.com/) template provide all resources for setup cloud and [BLE mqtt router](../ble_mqtt_router).

_Note: Template not provide by default functionality of device simulator. Simulator should be deployed manually. Details see [here](simulator/README.md)._ 

### Requirements

1) [aws cli](https://aws.amazon.com/cli/) should be available in the system. See [configuration guide](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
1) [Node.js 8+](https://nodejs.org/en/) should be available in the system. See [setup guide](https://github.com/creationix/nvm#installation).

### Setup

1) Open terminal and change directory to `<project_dir>/aws` 
1) Run in command line `npm install` 
1) Run in command line `npm run login` 
1) Run in command line `npm run setup` 
1) Copy and setup [config.sample.yml](./config.sample.yml) to `config.dev.yml` 

### Development (local)

1) Open terminal and change directory to `<project_dir>/aws` 
1) Run in command line `npm run offline`

### Deploy

1) Open terminal and change directory to `<project_dir>/aws` 
1) Run in command line `npm run deploy:sls` 
1) Run in command line `npm run deploy:spa` 

### Optional

1) For device simulation setup [simulator](simulator).