/* eslint-disable global-require, no-console, no-underscore-dangle */
const { name, version } = require('../package.json');

const moduleName = '__wikia_adengine';

if (typeof window[moduleName] === 'undefined') {
	window[moduleName] = require('./exports');

	Object.defineProperty(window[moduleName], '__version', {
		value: version
	});
} else if (window[moduleName].__version !== version) {
	console.warn(`${name} is trying to load v${version}, but ${window[moduleName].__version} is already loaded`);
}

module.exports = window[moduleName];
