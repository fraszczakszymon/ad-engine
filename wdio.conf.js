/* global browser */
exports.config = {
	specs: [
		'./tests/specs/**/*.test.js'
	],
	suites: {
		bidders: ['./tests/specs/bidders/*.test.js'],
		slots: ['./tests/specs/slots/*.test.js'],
		templates: ['./tests/specs/templates/*.test.js'],
		utils: ['./tests/specs/utils/*.test.js'],
		video: ['./tests/specs/video/*.test.js']
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
