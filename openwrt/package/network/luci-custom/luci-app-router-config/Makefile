include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-router-config
PKG_VERSION:=1.0
PKG_RELEASE:=1

PKG_MAINTAINER:=Router Admin <admin@example.com>
PKG_LICENSE:=GPL-2.0-only
PKG_LICENSE_FILES:=LICENSE

LUCI_TITLE:=Custom Router Configuration Interface (UCI/LuCI oriented)
LUCI_DEPENDS:=+luci-base +rpcd
LUCI_PKGARCH:=all

define Package/$(PKG_NAME)/conffiles
/etc/config/router
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
