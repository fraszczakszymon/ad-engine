/* eslint-disable import/no-extraneous-dependencies */
const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {

	specs: [
		'tests/specs/desktop/*.js'
	],
	capabilities: [
		{
			browserName: 'chrome',
			loggingPrefs: {
				browser: 'ALL'
			}
		}
	]
}, { clone: false });
