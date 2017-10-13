modprobe bluetooth_6lowpan

#echo "connect 00:AD:63:9B:6E:F2 1" > /sys/kernel/debug/bluetooth/6lowpan_control
echo "connect 00:AA:13:A1:5C:A5 1" > /sys/kernel/debug/bluetooth/6lowpan_control

# Set IPv6 forwarding (must be present).
#sudo echo 1 > /proc/sys/net/ipv6/conf/all/forwarding
# Run radvd daemon.
#sudo service radvd restart

#ping6 -I bt0 FE80:0000:0000:0000:02AD:63FF:FE9B:6EF2
#ping6 -I bt0 FE80:0000:0000:0000:02AA:13FF:FEA1:5CA5
ping6 -I bt0 FE80:0000:0000:0000:3BF3:7CB9:53C6:ECAE
