/* global browser */
/* eslint-disable import/no-extraneous-dependencies */
const networkCapture = require('./tests/common/networkCapture');
const path = require('path');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');
const md5 = require('js-md5');

function getScreenshotName(basePath) {
	return function (context) {
		const hash = md5(context.test.parent + context.test.title);

		return path.join(basePath, `${hash}.png`);
	};
}

exports.config = {
	suites: {
		bidders: ['./tests/specs/bidders/*.test.js'],
		slots: ['./tests/specs/slots/*.test.js'],
		templates: ['./tests/specs/templates/*.test.js'],
		utils: ['./tests/specs/utils/*.test.js'],
		video: ['./tests/specs/video/*.test.js']
	},
	maxInstances: 3,
	sync: true,
	logLevel: 'error',
	coloredLogs: true,
	deprecationWarnings: false,
	bail: 0,
	screenshotPath: './tests/.wdio/errorShots/',
	baseUrl: 'http://localhost:8080',
	waitforTimeout: 10000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	services: ['selenium-standalone', networkCapture, 'visual-regression'],
	framework: 'mocha',
	reporters: ['dot', 'allure'],
	reporterOptions: {
		allure: {
			outputDir: 'tests/allure-results'
		}
	},
	mochaOpts: {
		ui: 'bdd',
		compilers: ['js:babel-core/register'],
		timeout: 120000
	},
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
	}
};
