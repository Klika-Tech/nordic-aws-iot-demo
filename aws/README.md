## AWS Serverless Stask

Back-end running on [AWS](https://aws.amazon.com/), deployment provided via [serverless](https://serverless.com/).
[serverless.yml](./serverless.yml) - [serverless](https://serverless.com/) template provide all resources for setup cloud and [BLE mqtt router](../ble_mqtt_router).

_Note: Template not provide by default functionality of device simulator. Simulator should be deployed manually. Details see [here](./ec2/simulator/README.md)._ 

### Requirements

1) [aws cli](https://aws.amazon.com/cli/) should be available in the system. See [configuration guide](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).
1) [serverless](https://serverless.com/) should be available in the system. See [setup guide](https://serverless.com/framework/docs/getting-started/).

### Deploy

1) Open terminal and change directory to `<project_dir>/aws`.
1) Run in command line `sls deploy`

### Optional

1) For device simulation setup [simulator](./ec2/simulator).