const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const platforms = (PLATFORM) => ({
	mode: 'production',

	entry: path.resolve(__dirname, `platforms/${PLATFORM}/index.ts`),

	output: {
		filename: 'main.bundle.js',
		path: path.resolve(__dirname, `dist/${PLATFORM}`),
	},

	plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],

	devtool: 'source-map',
});

module.exports = ({ PLATFORM }) =>
	merge(platforms(PLATFORM), common(`platforms/${PLATFORM}/tsconfig.json`));
