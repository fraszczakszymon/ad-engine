/* global module, require */
const path = require('path');

module.exports = {
	entry: {
		'slots/animations': [
			'./examples/slots/animations/script.js'
		],
		'templates/floating-ad': [
			'./examples/templates/floating-ad/script.js'
		],
		'utils/browser-detect': [
			'./examples/utils/browser-detect/script.js'
		],
		'video/porvata': [
			'./examples/video/porvata/script.js'
		]
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: 'babel-loader'
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'examples'),
		filename: '[name]/dist/bundle.js'
	},
	resolve: {
		alias: {
			'ad-engine': path.join(__dirname, 'src'),
			node_modules: path.join(__dirname, 'node_modules')
		}
	}
};
