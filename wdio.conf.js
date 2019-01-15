/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const portfinder = require('portfinder');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');
const md5 = require('js-md5');
const networkCapture = require('./tests/common/network-capture');

function getScreenshotName(basePath) {
	return function (context) {
		const hash = md5(context.test.parent + context.test.title);

		return path.join(basePath, `${hash}.png`);
	};
}

exports.config = {
	suites: {
		bidders: ['./tests/specs/bidders/*.test.js'],
		services: ['./tests/specs/services/*.test.js'],
		slots: ['./tests/specs/slots/*.test.js'],
		hiviTemplates: ['./tests/specs/templates/hivi/*.test.js'],
		otherTemplates: ['./tests/specs/templates/non-hivi/*.test.js'],
		utils: ['./tests/specs/utils/*.test.js'],
		video: ['./tests/specs/video/*.test.js'],
	},
	maxInstances: 5,
	sync: true,
	logLevel: 'error',
	coloredLogs: true,
	deprecationWarnings: false,
	bail: 0,
	screenshotPath: './tests/errorScreenshots/',
	baseUrl: `http://localhost:${process.env.AD_ENGINE_PORT || 8080}`,
	waitforTimeout: 10000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	services: [networkCapture, 'static-server', 'selenium-standalone', 'visual-regression'],
	framework: 'mocha',
	reporters: ['dot', 'allure'],
	reporterOptions: {
		allure: {
			outputDir: 'tests/allure-results',
		},
	},
	mochaOpts: {
		ui: 'bdd',
		compilers: ['js:babel-core/register'],
		timeout: 120000,
	},
	onPrepare(config) {
		return new Promise((resolve) => {
			portfinder.getPort((err, port) => {
				config.baseUrl = `http://localhost:${process.env.AD_ENGINE_PORT || port}`;
				config.staticServerPort = process.env.AD_ENGINE_PORT || port;

				resolve();
			});
		});
	},
	staticServerFolders: [{ mount: '/', path: './examples' }],
	visualRegression: {
		compare: new VisualRegressionCompare.LocalCompare({
			referenceName: getScreenshotName(path.join(process.cwd(), 'tests/screenshots/reference')),
			screenshotName: getScreenshotName(path.join(process.cwd(), 'tests/screenshots/current')),
			diffName: getScreenshotName(path.join(process.cwd(), 'tests/screenshots/diff')),
			misMatchTolerance: 5,
		}),
		viewportChangePause: 300,
		viewports: [{ width: 1600, height: 900 }],
		orientations: ['landscape'],
	},
};
