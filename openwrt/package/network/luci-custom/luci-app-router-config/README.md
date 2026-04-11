# Custom Router Configuration Interface

This is a LuCI web interface for router configuration based on UCI (Unified Configuration Interface).

## Features

- **Network Interfaces**: Configure LAN, WAN, and custom interfaces with static, DHCP, or PPPoE protocols
- **Wireless Networks**: Set up WiFi access points with WPA2/WPA3 encryption
- **Firewall Zones**: Manage firewall policies for different network zones
- **DHCP Server**: Configure DHCP lease settings

## Installation

1. Copy this package to your OpenWrt build system:
   ```
   cp -r luci-app-router-config /path/to/openwrt/package/network/luci-custom/
   ```

2. Enable the package in your build configuration:
   ```
   make menuconfig
   # Navigate to: LuCI -> Applications -> luci-app-router-config
   ```

3. Build the package:
   ```
   make package/luci-app-router-config/compile V=s
   ```

4. Install on your router:
   ```
   opkg install luci-app-router-config_*.ipk
   ```

## Usage

After installation, access the web interface at:
```
http://your-router-ip/cgi-bin/luci/admin/services/router-config
```

The interface will be available in the LuCI menu under "Router Config".

## Configuration Files

- `/etc/config/router` - Main configuration file (UCI format)
- Web interface automatically reads/writes to UCI configuration

## License

GPL-2.0-only

## Maintainer

Router Admin <admin@example.com>
