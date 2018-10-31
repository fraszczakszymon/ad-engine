/* eslint-disable import/no-extraneous-dependencies */
const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {

	specs: [
		'tests/specs/**/*.mobile.test.js'
	],
	capabilities: [
		{
			browserName: 'chrome',
			chromeOptions: {
				mobileEmulation: {
					deviceName: 'iPhone X'
				}
			}
		}
	]
}, { clone: false });
