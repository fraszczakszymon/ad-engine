/* global browser */
const path = require('path');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
	return function (context) {
		const type = context.type;
		const testName = context.test.title;
		const browserVersion = parseInt(context.browser.version, 10);
		const browserName = context.browser.name;
		const browserViewport = context.meta.viewport;
		const browserWidth = browserViewport.width;
		const browserHeight = browserViewport.height;

		return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
	};
}

exports.config = {
	specs: [
		'./tests/specs/desktop/*.js'
	],
	suites: {
		bidders: [

		],
		templates: [
			'./tests/specs/desktop/floating-rail-ad.test.js',
			'./tests/specs//desktop/abcd-ad.test.js',
			'./tests/specs/desktop/hivi-uap-ad-desktop.test.js',
			// './tests/specs/desktop/hivi-uap-ad-mobile.test.js', // temporarily off for test, TODO remove comment
			'./tests/specs/desktop/hivi-uap-static-ad-desktop.test.js',
			// './tests/specs/mobile/hivi-uap-static-ad-mobile.test.js',  // temporarily off for test, TODO remove comment
			'./tests/specs/desktop/hivi-uap-jwp-ad-desktop.test.js',
			// './tests/specs/desktop/hivi-uap-jwp-ad-mobile.test.js', // temporarily off for test, TODO remove comment
			'./tests/specs/desktop/hivi-uap-twitch-ad-desktop.test.js',
			'./tests/specs/desktop/floating-ad.test.js',
			'./tests/specs/desktop/sticky-ad.test.js',
		],
		services: [

		],
		utils: [
			'./tests/specs/basset.test.js',
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
	exclude: [
	],
	maxInstances: 3,
	capabilities: [{
		browserName: 'chrome',
		loggingPrefs: {
			browser: 'ALL'
		}
	}],
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
		viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
		orientations: ['landscape', 'portrait'],
	},
	before() {
		browser.windowHandleSize({ width: 1920, height: 1080 });
	}
};
