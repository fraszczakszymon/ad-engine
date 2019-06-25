import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import serve from 'rollup-plugin-serve';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import { adEngineVersion } from './maintenance/rollup-plugins';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
const babelConfig = require('./configs/babel-app.config');

const pkg = require('./package.json');
const tsconfig = 'platforms/gamepedia/tsconfig.json';
const include = ['src/**', 'platforms/**'];

const targets = {
	esm: {
		input: 'platforms/gamepedia/index.ts',
		output: { file: 'dist/gamepedia/main.bundle.js', format: 'iife', sourcemap: true },
		watch: { include },
		// Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
		plugins: [
			json(),
			// Allow json resolution
			commonjs(),
			// Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
			resolve(),
			// Allow node_modules resolution, so you can use 'external' to control
			// which external modules to include in the bundle
			// https://github.com/rollup/rollup-plugin-node-resolve#usage
			sourceMaps(),
			postcss({ extract: true }),
			// Resolve source maps to the original source
			typescript({ tsconfig, check: false }),
			babel({
				babelrc: false,
				runtimeHelpers: true,
				include,
				extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
				...babelConfig,
			}),
			adEngineVersion(pkg.name, pkg.version),
			terser(),
			serve({
				contentBase: 'dist/gamepedia',
				port: 9000,
			}),
		],
	},
};

export default targets.esm;
