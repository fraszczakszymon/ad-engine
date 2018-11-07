/* eslint-disable import/no-extraneous-dependencies */
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
};
