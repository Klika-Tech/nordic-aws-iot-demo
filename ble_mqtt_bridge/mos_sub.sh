#!/usr/bin/env bash

mosquitto_sub --psk-identity Client_identity --psk 73656372657450534b -h localhost -p 8883 -t 'aws/things/Nordic/shadow/update' -v