#!/usr/bin/env bash
echo "System info:"
uname -a

echo "Modules info:"
modinfo bluetooth_6lowpan
echo
modinfo bluetooth
echo
modinfo 6lowpan
echo

echo "Load 6LoWPAN module."
modprobe bluetooth_6lowpan

echo "Enable the bluetooth 6lowpan module."
echo 1 > /sys/kernel/debug/bluetooth/6lowpan_enable

echo "Look for available HCI devices."
hciconfig

echo "Reset HCI0 device."
hciconfig hci0 reset

echo "Connect to Nordic Thingy 52."
echo "connect 00:AA:13:A1:5C:A5 1" > /sys/kernel/debug/bluetooth/6lowpan_control

sleep 5
echo "Start pings."
ping6 -I bt0 FE80:0000:0000:0000:02AA:13FF:FEA1:5CA5