const path = require('path');
const get = require('lodash/get');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const { getTypeScriptLoader } = require('./configs/webpack-app.config');
const pkg = require('./package.json');

const INCLUDE = [
	path.resolve(__dirname, 'src'),
	path.resolve(__dirname, 'examples'),
	path.resolve(__dirname, 'spec'),
	path.resolve(__dirname, 'platforms'),
];

const platforms = ({ PLATFORM }) => {
	const TSCONFIG = `platforms/${PLATFORM}/tsconfig.json`;

	return {
		mode: 'production',

		context: __dirname,

		entry: path.resolve(__dirname, `platforms/${PLATFORM}/index.ts`),

		output: {
			filename: 'main.bundle.js',
			path: path.resolve(__dirname, `dist/${PLATFORM}`),
		},

		resolve: {
			extensions: ['.ts', '.js', '.json'],
			modules: [...INCLUDE, 'node_modules'],
			plugins: [new TsConfigPathsPlugin({ configFileName: TSCONFIG })],
		},

		module: {
			rules: [
				getTypeScriptLoader({
					include: INCLUDE,
					tsconfig: TSCONFIG,
					reportFiles: [`platforms/${PLATFORM}/**/*.ts`],
				}),
				{
					test: /\.s?css$/,
					include: INCLUDE,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
				{
					test: path.resolve(__dirname, 'src/ad-engine/log-version.ts'),
					loader: StringReplacePlugin.replace({
						replacements: [
							{
								pattern: /<\?=[ \t]*PACKAGE\(([\w\-_.]*?)\)[ \t]*\?>/gi,
								replacement: (match, p1) => get(pkg, p1),
							},
						],
					}),
				},
			],
		},

		plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],

		devtool: 'source-map',
	};
};

module.exports = platforms;
