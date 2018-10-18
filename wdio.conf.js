/* global browser */
exports.config = {
	specs: [
		'./tests/specs/**/*.js'
	],
	suites: {
		bidders: [

		],
		templates: [
			'./tests/specs/floating-rail-ad.test.js',
			'./tests/specs/abcd-ad.test.js',
			'./tests/specs/hivi-uap-ad.test.js',
			'./tests/specs/hivi-uap-static-ad.test.js',
			'./tests/specs/hivi-uap-jwp-ad.test.js',
			'./tests/specs/hivi-uap-twitch-ad.test.js',
			'./tests/specs/floating-ad.test.js',
			'./tests/specs/sticky-ad.test.js',
		],
		services: [

		],
		utils: [
			'./tests/specs/basset.test.js',
		],
		slots: [
			'./tests/specs/btf-only-ad.test.js',
			'./tests/specs/repeatable-slots.test.js',
			'./tests/specs/animations-ad.test.js',
			'./tests/specs/common-slots-ad.test.js',
			'./tests/specs/delay-ad.test.js',
			'./tests/specs/viewport-conflict-ad.test.js',
			'./tests/specs/block-btf-ad.test.js',
			'./tests/specs/empty-response.test.js',
		],
		video: [
			'./tests/specs/porvata.test.js',
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
	services: ['selenium-standalone'],
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
	before() {
		browser.windowHandleSize({ width: 1920, height: 1080 });
	}
};
