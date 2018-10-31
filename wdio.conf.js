/* global browser */
/* eslint-disable import/no-extraneous-dependencies */
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
		bidders: [

		],
		desktopTemplates: [
			'./tests/specs/floating-rail-ad.desktop.test.js',
			'./tests/specs/abcd-ad.desktop.test.js',
			'./tests/specs/hivi-uap-ad.desktop.test.js',
			'./tests/specs/hivi-uap-sticky-bfab-ad.desktop.test.js',
			'./tests/specs/hivi-uap-static-ad.desktop.test.js',
			'./tests/specs/hivi-uap-jwp-ad.desktop.test.js',
			'./tests/specs/hivi-uap-twitch-ad.desktop.test.js',
			'./tests/specs/floating-ad.desktop.test.js',
			'./tests/specs/sticky-ad.desktop.test.js',
		],
		mobileTemplates: [
			'./tests/specs/hivi-uap-ad.mobile.test.js',
			'./tests/specs/hivi-uap-static-ad.mobile.test.js',
			'./tests/specs/hivi-uap-jwp-ad.mobile.test.js',
			'./tests/specs/abcd-ad-mobile.test.js',
		],
		services: [

		],
		utils: [
			'./tests/specs/labrador-basset.desktop.test.js',
		],
		slots: [
			'./tests/specs/btf-only-ad.desktop.test.js',
			'./tests/specs/repeatable-slots.desktop.test.js',
			'./tests/specs/animations-ad.desktop.test.js',
			'./tests/specs/common-slots-ad.desktop.test.js',
			'./tests/specs/delay-ad.desktop.test.js',
			'./tests/specs/viewport-conflict-ad.desktop.test.js',
			'./tests/specs/block-btf-ad.desktop.test.js',
			'./tests/specs/empty-response.desktop.test.js',
		],
		video: [
			'./tests/specs/porvata.desktop.test.js',
		],
		vendors: [

		]
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
	services: ['selenium-standalone', 'visual-regression'],
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
		timeout: 200000
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
		orientations: ['landscape', 'portrait'],
	},
	before() {
		browser.windowHandleSize({ width: 1920, height: 1080 });
	}
};
