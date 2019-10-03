const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const platforms = ({ platform }) => {
	return {
		entry: path.resolve(__dirname, `platforms/${platform}/index.ts`),

		output: {
			filename: 'main.bundle.js',
			path: path.resolve(__dirname, `dist/platforms/${platform}`),
		},

		plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],

		performance: {
			maxAssetSize: 310000,
			maxEntrypointSize: 330000,
		},

		devServer: {
			inline: false,
			port: 9000,
			contentBase: `dist/platforms`,
		},

		devtool: 'source-map',
	};
};

module.exports = () => {
	return [
		merge(common(), platforms({ platform: 'gamepedia' })),
		merge(common(), platforms({ platform: 'sports' })),
	];
};
