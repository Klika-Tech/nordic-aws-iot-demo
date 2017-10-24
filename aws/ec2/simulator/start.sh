#!/usr/bin/env bash

CURRENT_DIR=$(dirname "$0")
INTERVAL=3

echo "Start publish loop..."

while true
do
 node ${CURRENT_DIR}/index.js
 sleep ${INTERVAL}
done