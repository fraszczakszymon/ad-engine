/* global module, require */
/* eslint-disable no-console, import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const get = require('lodash/get');
const pkg = require('./package.json');

const common = {
	mode: 'development',
	context: __dirname,
	module: {
		rules: [
			{
				test: /.js$/,
				use: 'babel-loader',
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
				type: 'javascript/auto',
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				],
				exclude: /node_modules/
			},
			{
				test: path.resolve(__dirname, 'src/ad-engine/index.js'),
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /<\?=[ \t]*PACKAGE\(([\w\-_.]*?)\)[ \t]*\?>/ig,
						replacement: (match, p1) => get(pkg, p1)
					}]
				})
			}
		]
	}
};

const development = {
	entry: {
		'bidders/a9': './examples/bidders/a9/script.js',
		'bidders/prebid': './examples/bidders/prebid/script.js',
		'bidders/reusable-prebid': './examples/bidders/reusable-prebid/script.js',
		'services/bill-the-lizard': './examples/services/bill-the-lizard/script.js',
		'services/krux': './examples/services/krux/script.js',
		'slots/animations': './examples/slots/animations/script.js',
		'slots/block-btf': './examples/slots/block-btf/script.js',
		'slots/btf-only': './examples/slots/btf-only/script.js',
		'slots/common-slots': './examples/slots/common-slots/script.js',
		'slots/delay': './examples/slots/delay/script.js',
		'slots/empty-response': './examples/slots/empty-response/script.js',
		'slots/repeatable-slots': './examples/slots/repeatable-slots/script.js',
		'slots/viewport-conflicts': './examples/slots/viewport-conflicts/script.js',
		'templates/abcd': './examples/templates/abcd/script.js',
		'templates/floating-ad': './examples/templates/floating-ad/script.js',
		'templates/floating-rail': './examples/templates/floating-rail/script.js',
		'templates/floor-adhesion': './examples/templates/floor-adhesion/script.js',
		'templates/hivi-uap': './examples/templates/hivi-uap/script.js',
		'templates/hivi-uap-ctp': './examples/templates/hivi-uap-ctp/script.js',
		'templates/hivi-uap-stickiness-not-allowed': './examples/templates/hivi-uap-stickiness-not-allowed/script.js',
		'templates/hivi-uap-static': './examples/templates/hivi-uap-static/script.js',
		'templates/hivi-uap-jwp': './examples/templates/hivi-uap-jwp/script.js',
		'templates/hivi-uap-sticky-bfab': './examples/templates/hivi-uap-sticky-bfab/script.js',
		'templates/hivi-uap-twitch': './examples/templates/hivi-uap-twitch/script.js',
		'templates/interstitial': './examples/templates/interstitial/script.js',
		'templates/outstream': './examples/templates/outstream/script.js',
		'templates/sticky-ad': './examples/templates/sticky-ad/script.js',
		'templates/uap-roadblock': './examples/templates/uap-roadblock/script.js',
		'templates/vuap': './examples/templates/vuap/script.js',
		'utils/block-detect': './examples/utils/block-detect/script.js',
		'utils/browser-detect': './examples/utils/browser-detect/script.js',
		'utils/device-detect': './examples/utils/device-detect/script.js',
		'utils/labrador-basset': './examples/utils/labrador-basset/script.js',
		'video/porvata': './examples/video/porvata/script.js'
	},
	devtool: 'cheap-module-eval-source-map',
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vendor',
					filename: '[name]/dist/vendor.js',
					chunks: 'all'
				}
			}
		}
	},
	output: {
		path: path.resolve(__dirname, 'examples'),
		filename: '[name]/dist/bundle.js'
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name]/dist/styles.css' }),
		new StringReplacePlugin(),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'lib/prebid.min.js'), to: 'vendor/dist/prebid.min.js' }
		])
	],
	resolve: {
		alias: {
			[pkg.name]: path.join(__dirname, 'src/ad-engine'),
			'@wikia/ad-bidders': path.join(__dirname, 'src/ad-bidders'),
			'@wikia/ad-products': path.join(__dirname, 'src/ad-products'),
			'@wikia/ad-services': path.join(__dirname, 'src/ad-services')
		}
	}
};

const test = {
	resolve: {
		alias: {
			[pkg.name]: path.join(__dirname, 'src/ad-engine'),
			'@wikia/ad-products': path.join(__dirname, 'src/ad-products')
		}
	}
};

const adEngine = {
	config: {
		mode: 'production',
		entry: {
			'ad-engine': './src/ad-engine/index.js'
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new StringReplacePlugin(),
			new webpack.optimize.ModuleConcatenationPlugin()
		]
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies).map(key => new RegExp(`^${key}`)),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2'
			},
			optimization: {
				minimize: false
			},
		},
		window: {
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adEngine'],
				libraryTarget: 'window'
			}
		}
	}
};

const adProducts = {
	config: {
		mode: 'production',
		entry: {
			'ad-products': './src/ad-products/index.js',
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new MiniCssExtractPlugin({ filename: '[name].css' }),
			new StringReplacePlugin(),
			new webpack.optimize.ModuleConcatenationPlugin()
		]
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies).map(key => new RegExp(`^${key}`)).concat([
				/^@wikia\/ad-engine/
			]),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2'
			},
			optimization: {
				minimize: false
			}
		},
		window: {
			externals: {
				'@wikia/ad-engine': {
					window: ['Wikia', 'adEngine']
				}
			},
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adProducts'],
				libraryTarget: 'window'
			}
		}
	}
};

const adBidders = {
	config: {
		mode: 'production',
		entry: {
			'ad-bidders': './src/ad-bidders/index.js',
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.ModuleConcatenationPlugin()
		]
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies).map(key => new RegExp(`^${key}`)).concat([
				/^@wikia\/ad-engine/
			]),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2'
			},
			optimization: {
				minimize: false
			}
		},
		window: {
			externals: {
				'@wikia/ad-engine': {
					window: ['Wikia', 'adEngine']
				}
			},
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adBidders'],
				libraryTarget: 'window'
			}
		}
	}
};

const adServices = {
	config: {
		mode: 'production',
		entry: {
			'ad-services': './src/ad-services/index.js',
		},
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.optimize.ModuleConcatenationPlugin()
		]
	},
	targets: {
		commonjs: {
			externals: Object.keys(pkg.dependencies).map(key => new RegExp(`^${key}`)).concat([
				/^@wikia\/ad-engine/
			]),
			output: {
				filename: '[name].js',
				library: 'adEngine',
				libraryTarget: 'commonjs2'
			},
			optimization: {
				minimize: false
			}
		},
		window: {
			externals: {
				'@wikia/ad-engine': {
					window: ['Wikia', 'adEngine']
				}
			},
			output: {
				filename: '[name].global.js',
				library: ['Wikia', 'adServices'],
				libraryTarget: 'window'
			}
		}
	}
};

module.exports = function (env) {
	const isProduction = (process.env.NODE_ENV === 'production') || (env && env.production);
	const isTest = (env && env.test);

	if (isProduction) {
		return [
			merge(common, adEngine.config, adEngine.targets.window),
			merge(common, adEngine.config, adEngine.targets.commonjs),
			merge(common, adProducts.config, adProducts.targets.window),
			merge(common, adProducts.config, adProducts.targets.commonjs),
			merge(common, adBidders.config, adBidders.targets.commonjs),
			merge(common, adBidders.config, adBidders.targets.window),
			merge(common, adServices.config, adServices.targets.commonjs),
			merge(common, adServices.config, adServices.targets.window)
		];
	} else if (isTest) {
		return merge(common, test);
	}

	return merge(common, development);
};
