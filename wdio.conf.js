exports.config = {
	specs: [
		'./tests/specs/**/*.js'
	],
	exclude: [
	],
	maxInstances: 10,
	capabilities: [{
		maxInstances: 5,
		browserName: 'chrome'
	}],
	sync: true,
	logLevel: 'error',
	coloredLogs: true,
	deprecationWarnings: true,
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
			outputDir: 'allure-results'
		}
	},

	mochaOpts: {
		ui: 'bdd',
		compilers: ['js:babel-core/register'],
		timeout: 20000
	},
};
