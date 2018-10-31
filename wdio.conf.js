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
			'./tests/specs/desktop/floating-rail-ad.test.js',
			'./tests/specs/desktop/abcd-ad.test.js',
			'./tests/specs/desktop/hivi-uap-ad.desktop.test.js',
			'./tests/specs/desktop/hivi-uap-sticky-bfab-ad.desktop.test.js',
			'./tests/specs/desktop/hivi-uap-static-ad.desktop.test.js',
			'./tests/specs/desktop/hivi-uap-jwp-ad.desktop.test.js',
			'./tests/specs/desktop/hivi-uap-twitch-ad.desktop.test.js',
			'./tests/specs/desktop/floating-ad.test.js',
			'./tests/specs/desktop/sticky-ad.test.js',
		],
		mobileTemplates: [
			'./tests/specs/mobile/hivi-uap-ad.mobile.test.js',
			'./tests/specs/mobile/hivi-uap-static-ad.mobile.test.js',
			'./tests/specs/mobile/hivi-uap-jwp-ad.mobile.test.js',
			'./tests/specs/mobile/abcd-ad-mobile.test.js',
		],
		services: [

		],
		utils: [
			'./tests/specs/labrador-basset.test.js',
		],
		slots: [
			'./tests/specs/desktop/btf-only-ad.test.js',
			'./tests/specs/desktop/repeatable-slots.test.js',
			'./tests/specs/desktop/animations-ad.test.js',
			'./tests/specs/desktop/common-slots-ad.test.js',
			'./tests/specs/desktop/delay-ad.test.js',
			'./tests/specs/desktop/viewport-conflict-ad.test.js',
			'./tests/specs/desktop/block-btf-ad.test.js',
			'./tests/specs/desktop/empty-response.test.js',
		],
		video: [
			'./tests/specs/desktop/porvata.test.js',
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
			referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
			screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
			diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
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
