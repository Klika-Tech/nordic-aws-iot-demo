#!/usr/bin/env bash

AWS_REGION=eu-central-1
RESOURCE_FOLDER=/tmp
MOSQUITTO_CERTS=/etc/mosquitto/certs

# Create an IAM policy for the bridge
aws --region ${AWS_REGION} iot create-policy --policy-name bridge --policy-document '{"Version": "2012-10-17","Statement": [{"Effect": "Allow","Action": "iot:*","Resource": "*"}]}'

# Create cert directory
mkdir -p /etc/mosquitto/certs || true

cd /etc/mosquitto/certs

# Create certs
aws --region ${AWS_REGION} iot create-keys-and-certificate --set-as-active \
	--certificate-pem-outfile ${MOSQUITTO_CERTS}/cert.crt \
	--private-key-outfile ${MOSQUITTO_CERTS}/private.key \
	--public-key-outfile ${MOSQUITTO_CERTS}/public.key > ${RESOURCE_FOLDER}/bridge.json

#Add read permissions to private key and client cert
sudo chmod 644 ${MOSQUITTO_CERTS}/private.key
sudo chmod 644 ${MOSQUITTO_CERTS}/cert.crt

ARN_OF_CERTIFICATE=$(cat ${RESOURCE_FOLDER}/bridge.json | jq .certificateArn --raw-output)

#Attach the policy to your certificate
aws iot attach-principal-policy --policy-name bridge --principal ${ARN_OF_CERTIFICATE}

# Download root CA
wget https://www.symantec.com/content/en/us/enterprise/verisign/roots/VeriSign-Class%203-Public-Primary-Certification-Authority-G5.pem -O ${MOSQUITTO_CERTS}/rootCA.pem