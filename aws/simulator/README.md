## Nordic Thingy 52 Simulator

For development and testing purposes you can use a simulator of [Nordic Thingy 52](https://www.nordicsemi.com/eng/Products/Nordic-Thingy-52). 
You can use the simulator as the [local script](start.sh), or you can deploy simulator standalone on [EC2](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html). For setup, detail sees below.

### Requirements

1) Launch [EC2](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) instance based on [Amazon Linux](https://aws.amazon.com/amazon-linux-ami/)
1) Create [IAM Role](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) for launched instance with policies: [AmazonDynamoDBFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess$jsonEditor), [AWSIoTDataAccess](https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AWSIoTDataAccess$jsonEditor), [AWSIoTFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn:aws:iam::aws:policy/AWSIoTFullAccess$jsonEditor).
1) Copy directory `aws/ec2/simulator` to home directory of launched instance.

### Setup Simulator
    
1) Login to created instance.
1) Setup Node.js run in command line: <pre>
sudo su
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum install -y nodejs</pre>
1) Install node dependencies. Execute `npm install` in project directory on launched EC2 instance.
1) Add script to startup by following command: <pre>
$ crontab -l | { cat; echo "@reboot /home/ec2-user/simulator/start.sh > /dev/null 2>&1"; } | crontab -
</pre>1) Reboot

### Optional

1) Setup a simulator target region via `AWS_REGION` environment variable.