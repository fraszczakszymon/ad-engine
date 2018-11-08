/* global browser */
/* eslint-disable import/no-extraneous-dependencies */

const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');
const path = require('path');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');
const md5 = require('js-md5');

function getScreenshotName(basePath) {
	return function (context) {
		const hash = md5(context.test.parent + context.test.title);

		return path.join(basePath, `${hash}.png`);
	};
}
exports.config = merge(wdioConf.config, {
	specs: [
		'tests/specs/**/*.desktop.test.js'
	],
	services: ['visual-regression'],
	capabilities: [
		{
			browserName: 'chrome',
			loggingPrefs: {
				browser: 'ALL'
			}
		}
	],
	visualRegression: {
		compare: new VisualRegressionCompare.LocalCompare({
			referenceName: getScreenshotName(path.join(process.cwd(), 'tests/screenshots/reference')),
			screenshotName: getScreenshotName(path.join(process.cwd(), 'tests/screenshots/current')),
			diffName: getScreenshotName(path.join(process.cwd(), 'tests/screenshots/diff')),
			misMatchTolerance: 0.01,
		}),
		viewportChangePause: 300,
		viewports: [{ width: 1920, height: 1080 }],
		orientations: ['landscape'],
	},
	before() {
		browser.windowHandleSize({ width: 1920, height: 1080 });
	},
	after() {
		browser.windowHandleSize({ width: 1920, height: 1080 });
	}
}, { clone: false });
