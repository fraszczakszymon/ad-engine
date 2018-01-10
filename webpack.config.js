/* global module, require */
/* eslint-disable no-console, import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pkg = require('./package.json');

const isProduction = (process.env.NODE_ENV === 'production');
const configs = {
	common: {
		context: __dirname,
		module: {
			rules: [
				{
					test: /.js$/,
					use: 'babel-loader',
					exclude: /node_modules/
				}
			]
		}
	},
	production: {
		entry: {
			'ad-engine': './src/index.js'
		},
		externals: Object.keys(pkg.dependencies),
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			library: 'adengine',
			libraryTarget: 'commonjs2'
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			})
		]
	},
	development: {
		entry: {
			'slots/animations': './examples/slots/animations/script.js',
			'slots/empty-response': './examples/slots/empty-response/script.js',
			'templates/floating-ad': './examples/templates/floating-ad/script.js',
			'utils/browser-detect': './examples/utils/browser-detect/script.js',
			'video/porvata': './examples/video/porvata/script.js'
		},
		devtool: 'cheap-module-eval-source-map',
		output: {
			path: path.resolve(__dirname, 'examples'),
			filename: '[name]/dist/bundle.js'
		},
		resolve: {
			alias: {
				[pkg.name]: path.join(__dirname, 'src')
			}
		}
	}
};

module.exports = merge([
	configs.common,
	isProduction ? configs.production : configs.development
]);
