# Run MQTT subscriber
#mosquitto_sub -h api.xively.com -t /v2/feeds/637693378.json -u jAVEnAqZ9IVCFSQ9Oc9XJ7FuMvggmmYIdgqE8ZYKgMbjvm5T

mosquitto_sub --psk-identity Client_identity --psk 73656372657450534b -h localhost -p 8883 -t '#' -v