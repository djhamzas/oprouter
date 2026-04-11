'use strict';
'require view';
'require form';
'require fs';
'require uci';

return view.extend({
	title: _('Router Configuration'),
	description: _('Configure router settings using UCI backend'),

	load: function() {
		return Promise.all([
			uci.load('network'),
			uci.load('wireless'),
			uci.load('firewall'),
			uci.load('dhcp')
		]);
	},

	render: function(data) {
		var m, s, o;

		m = new form.Map('router', _('Router Configuration'), 
			_('Manage your router settings through a web interface powered by UCI and LuCI'));

		// Network Configuration Section
		s = m.section(form.TypedSection, 'interface', _('Network Interfaces'),
			_('Configure network interfaces including LAN, WAN, and custom interfaces'));
		s.addremove = true;
		s.anonymous = false;

		o = s.option(form.Value, 'ifname', _('Interface Name'));
		o.datatype = 'string';
		o.required = true;

		o = s.option(form.ListValue, 'proto', _('Protocol'));
		o.value('static', 'Static Address');
		o.value('dhcp', 'DHCP Client');
		o.value('pppoe', 'PPPoE');
		o.default = 'static';

		o = s.option(form.Value, 'ipaddr', _('IPv4 Address'));
		o.datatype = 'ip4addr';
		o.depends('proto', 'static');

		o = s.option(form.Value, 'netmask', _('IPv4 Netmask'));
		o.datatype = 'ip4addr';
		o.value('255.255.255.0');
		o.value('255.255.0.0');
		o.value('255.0.0.0');
		o.default = '255.255.255.0';
		o.depends('proto', 'static');

		o = s.option(form.Value, 'gateway', _('Gateway'));
		o.datatype = 'ip4addr';
		o.depends('proto', 'static');

		o = s.option(form.DynamicList, 'dns', _('DNS Servers'));
		o.datatype = 'ip4addr';
		o.depends('proto', 'static');

		// Wireless Configuration Section
		s = m.section(form.TypedSection, 'wifi-iface', _('Wireless Networks'),
			_('Configure wireless access points and client connections'));
		s.addremove = true;
		s.anonymous = false;

		o = s.option(form.ListValue, 'device', _('Radio Device'));
		o.value('radio0', 'Radio 0 (2.4GHz)');
		o.value('radio1', 'Radio 1 (5GHz)');
		o.default = 'radio0';

		o = s.option(form.ListValue, 'mode', _('Mode'));
		o.value('ap', 'Access Point');
		o.value('sta', 'Client');
		o.value('adhoc', 'Ad-Hoc');
		o.default = 'ap';

		o = s.option(form.Value, 'ssid', _('SSID'));
		o.datatype = 'string';
		o.required = true;
		o.depends('mode', 'ap');
		o.depends('mode', 'sta');

		o = s.option(form.ListValue, 'encryption', _('Encryption'));
		o.value('none', 'No Encryption');
		o.value('psk2', 'WPA2-PSK');
		o.value('psk-mixed', 'WPA/WPA2 Mixed');
		o.value('sae', 'WPA3-SAE');
		o.default = 'psk2';

		o = s.option(form.Value, 'key', _('Pre-Shared Key'));
		o.password = true;
		o.depends('encryption', 'psk2');
		o.depends('encryption', 'psk-mixed');
		o.depends('encryption', 'sae');

		// Firewall Configuration Section
		s = m.section(form.TypedSection, 'zone', _('Firewall Zones'),
			_('Configure firewall zones and traffic rules'));
		s.addremove = true;
		s.anonymous = false;

		o = s.option(form.Value, 'name', _('Zone Name'));
		o.datatype = 'string';
		o.required = true;

		o = s.option(form.ListValue, 'input', _('Input Policy'));
		o.value('ACCEPT', 'Accept');
		o.value('REJECT', 'Reject');
		o.value('DROP', 'Drop');
		o.default = 'REJECT';

		o = s.option(form.ListValue, 'output', _('Output Policy'));
		o.value('ACCEPT', 'Accept');
		o.value('REJECT', 'Reject');
		o.value('DROP', 'Drop');
		o.default = 'ACCEPT';

		o = s.option(form.ListValue, 'forward', _('Forward Policy'));
		o.value('ACCEPT', 'Accept');
		o.value('REJECT', 'Reject');
		o.value('DROP', 'Drop');
		o.default = 'DROP';

		o = s.option(form.Flag, 'masq', _('Masquerading'));
		o.default = o.enabled;

		// DHCP Configuration Section
		s = m.section(form.TypedSection, 'dhcp', _('DHCP Server'),
			_('Configure DHCP server settings'));
		s.addremove = true;
		s.anonymous = false;

		o = s.option(form.Value, 'interface', _('Interface'));
		o.datatype = 'string';
		o.required = true;

		o = s.option(form.Flag, 'ignore', _('Ignore Interface'));
		o.default = o.disabled;

		o = s.option(form.Value, 'start', _('Start'));
		o.datatype = 'uinteger';
		o.default = '100';
		o.depends('ignore', '0');

		o = s.option(form.Value, 'limit', _('Limit'));
		o.datatype = 'uinteger';
		o.default = '150';
		o.depends('ignore', '0');

		o = s.option(form.Value, 'leasetime', _('Lease Time'));
		o.datatype = 'string';
		o.placeholder = '12h';
		o.depends('ignore', '0');

		return m.render();
	}
});
