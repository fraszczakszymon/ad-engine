const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const spec = {
	mode: 'development',
};

module.exports = merge(common({ tsconfig: 'spec/tsconfig.json' }), spec);
