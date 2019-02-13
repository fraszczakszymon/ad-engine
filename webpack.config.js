/* global module, require */
/* eslint-disable no-console, import/no-extraneous-dependencies */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const get = require('lodash/get');
const pkg = require('./package.json');

const examplePages = {};

function findExamplePages(startPath, filter) {
	const files = fs.readdirSync(startPath);

	files.forEach((file) => {
		const filename = path.join(startPath, file);
		const stat = fs.lstatSync(filename);

		if (stat.isDirectory()) {
			findExamplePages(filename, filter);
		} else if (filename.indexOf(filter) >= 0) {
			const shortName = filename.replace('examples/', '').replace('/script.js', '');

			examplePages[shortName] = `./${filename}`;
		}
	});
}

findExamplePages('./examples', 'script.js');

const common = {
	mode: 'development',
	context: __dirname,
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'src'),
			},
			{
				test: /\.js$/,
				use: ['source-map-loader'],
				enforce: 'pre',
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
				type: 'javascript/auto',
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
			{
				test: path.resolve(__dirname, 'src/ad-engine/index.ts'),
				loader: StringReplacePlugin.replace({
					replacements: [
						{
							pattern: /<\?=[ \t]*PACKAGE\(([\w\-_.]*?)\)[ \t]*\?>/gi,
							replacement: (match, p1) => get(pkg, p1),
						},
						{
							pattern: /<\?=[ \t]*PACKAGE_REPO_COMMIT[ \t]*\?>/gi,
							replacement: () =>
								execSync('git rev-parse --short HEAD')
									.toString()
									.trim(),
						},
					],
				}),
			},
		],
	},
};

const development = {
	entry: examplePages,
	devtool: 'cheap-module-eval-source-map',
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vendor',
					filename: '[name]/dist/vendor.js',
					chunks: 'all',
				},
			},
		},
	},
	output: {
		path: path.resolve(__dirname, 'examples'),
		filename: '[name]/dist/bundle.js',
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name]/dist/styles.css' }),
		new StringReplacePlugin(),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'lib/prebid.min.js'), to: 'vendor/dist/prebid.min.js' },
		]),
	],
	resolve: {
		alias: {
			[pkg.name]: path.join(__dirname, 'src/ad-engine'),
			'@wikia/ad-bidders': path.join(__dirname, 'src/ad-bidders'),
			'@wikia/ad-products': path.join(__dirname, 'src/ad-products'),
			'@wikia/ad-services': path.join(__dirname, 'src/ad-services'),
		},
	},
};

const wdioTest = {
	devtool: null,
	optimization: null,
};

const test = {
	resolve: {
		alias: {
			[pkg.name]: path.join(__dirname, 'src/ad-engine'),
			'@wikia/ad-products': path.join(__dirname, 'src/ad-products'),
		},
	},
};

const adEngine = {
	config: {
		mode: 'production',
		entry: {
			'ad-engine': './src/ad-engine/index.ts',
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			new StringReplacePlugin(),
			new webpack.optimize.ModuleConcatenationPlugin(),
		],
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies).map((key) => new RegExp(`^${key}`)),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2',
			},
			optimization: {
				minimize: false,
			},
		},
		window: {
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adEngine'],
				libraryTarget: 'window',
			},
		},
	},
};

const adProducts = {
	config: {
		mode: 'production',
		entry: {
			'ad-products': './src/ad-products/index.ts',
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			new MiniCssExtractPlugin({ filename: '[name].css' }),
			new StringReplacePlugin(),
			new webpack.optimize.ModuleConcatenationPlugin(),
		],
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies)
				.map((key) => new RegExp(`^${key}`))
				.concat([/^@wikia\/ad-engine/]),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2',
			},
			optimization: {
				minimize: false,
			},
		},
		window: {
			externals: {
				'@wikia/ad-engine': {
					window: ['Wikia', 'adEngine'],
				},
			},
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adProducts'],
				libraryTarget: 'window',
			},
		},
	},
};

const adBidders = {
	config: {
		mode: 'production',
		entry: {
			'ad-bidders': './src/ad-bidders/index.ts',
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
		],
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies)
				.map((key) => new RegExp(`^${key}`))
				.concat([/^@wikia\/ad-engine/]),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2',
			},
			optimization: {
				minimize: false,
			},
		},
		window: {
			externals: {
				'@wikia/ad-engine': {
					window: ['Wikia', 'adEngine'],
				},
			},
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adBidders'],
				libraryTarget: 'window',
			},
		},
	},
};

const adServices = {
	config: {
		mode: 'production',
		entry: {
			'ad-services': './src/ad-services/index.ts',
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
			new webpack.optimize.ModuleConcatenationPlugin(),
		],
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies)
				.map((key) => new RegExp(`^${key}`))
				.concat([/^@wikia\/ad-engine/]),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2',
			},
			optimization: {
				minimize: false,
			},
		},
		window: {
			externals: {
				'@wikia/ad-engine': {
					window: ['Wikia', 'adEngine'],
				},
			},
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adServices'],
				libraryTarget: 'window',
			},
		},
	},
};

module.exports = function (env) {
	const isProduction = process.env.NODE_ENV === 'production' || (env && env.production);
	const isWdioTest = env && env['wdio-test'];
	const isTest = env && env.test;

	if (isProduction) {
		return [
			merge(common, adEngine.config, adEngine.targets.window),
			merge(common, adEngine.config, adEngine.targets.commonjs),
			merge(common, adProducts.config, adProducts.targets.window),
			merge(common, adProducts.config, adProducts.targets.commonjs),
			merge(common, adBidders.config, adBidders.targets.commonjs),
			merge(common, adBidders.config, adBidders.targets.window),
			merge(common, adServices.config, adServices.targets.commonjs),
			merge(common, adServices.config, adServices.targets.window),
		];
	}
	if (isTest) {
		return merge(common, test);
	}
	if (isWdioTest) {
		return merge(common, development, wdioTest);
	}

	return merge(common, development);
};
