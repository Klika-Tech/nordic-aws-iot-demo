BLE MQTT Router
=============

Due to difficulties with getting global IPv6 connectivity (not all providers supported) we provide work around.
Setup MQTT bridge from local IPv6 network to AWS IoT (based on the official [guide](https://aws.amazon.com/blogs/iot/how-to-bridge-mosquitto-mqtt-broker-to-aws-iot/)).

_Note: Current documentation describe setup and workflow processes on linux-based systems (tested on Ubuntu 16.04)._

##### Contents

- [Requirements](#requirements)
- [Setup bridge to AWS IoT](#requirements)
- [Workflow](#workflow)
- [External Resources](#external-resources)

### Requirements

1) [hcitool](https://www.systutorials.com/docs/linux/man/1-hcitool/) should be available in the system.
1) IPv6 should be allowed, see `/etc/system.conf`: <pre>
net.ipv6.conf.all.disable_ipv6 = 0
net.ipv6.conf.default.disable_ipv6 = 0
net.ipv6.conf.lo.disable_ipv6 = 0</pre>
1) [bluetooth_6lowpan](https://wiki.openwrt.org/doc/howto/bluetooth.6lowpan) kernel module should be installed.
1) Bluetooth 4+ connector should be available as `hci0` interface.

### Setup bridge to AWS IoT

1) Install [Mosquitto](https://mosquitto.org/).
1) Copy (edit) [mosquitto.conf](./mosquitto.conf) to `/etc/mosquitto/mosquitto.conf`.
1) Copy (edit) [psk_file.txt](./psk_file.txt) to `/etc/mosquitto/psk_file.txt`.
1) Copy [bridge.conf](./bridge.conf) to `/etc/mosquitto/conf.d/bridge.conf`. 
1) Edit `/etc/mosquitto/conf.d/bridge.conf` change `address` to your [AWS IoT Endpoint](http://docs.aws.amazon.com/cli/latest/reference/iot/describe-endpoint.html). 
1) Execute [gen_aws_bridge_certs.sh](./gen_aws_bridge_certs.sh) in the command line (with sudo permissions).
1) Modify [ble6_conn.sh](./ble6_conn.sh), change Thingy link-local IPv6 addresses (see details [here](https://developer.nordicsemi.com/nRF5_IoT_SDK/doc/0.9.0/html/a00088.html)).  

### Workflow

1) Run mosquitto broker, execute [mos_bro.sh](./mos_bro.sh).
1) Subscribe to thing topic, execute [mos_sub.sh](./mos_sub.sh).
1) Connect to Thingy from PC and setup PAN network, execute [ble6_conn.sh](./ble6_conn.sh).

### External Resources

- Core Modules
	- [bluetooth_6lowpan](https://wiki.openwrt.org/doc/howto/bluetooth.6lowpan)
- CLI Tools
	- [AWS CLI](https://aws.amazon.com/cli/)
- Daemons
	- [Mosquitto](https://mosquitto.org/)