exports.config = {
	specs: [
		'./tests/specs/**/*.js'
	],
	suites: {
		bidders: [

		],
		templates: [
			'./tests/specs/floating-rail-ad.test.js',
			'./tests/specs/abcd.test.js',
			'./tests/specs/hivi-uap-ad.test.js',
			'./tests/specs/hivi-uap-static-ad.test.js',
			'./tests/specs/floating-ad.test.js',
		],
		services: [

		],
		utils: [

		],
		slots: [
			'./tests/specs/btf-only-ad.test.js',
			'./tests/specs/repeatable-slots-ad.test.js',
			'./tests/specs/animations-ad.test.js',
			'./tests/specs/delay-ad.test.js',
			'./tests/specs/viewport-conflict-ad.test.js',
			'./tests/specs/block-btf-ad.test.js',
			'./tests/specs/empty-response.test.js',
		],
		video: [
			'./tests/specs/porvata.test.js',
		],
		currentTest: [
			'./tests/specs/hivi-uap-ad.test.js', // spot for a test that is currently being worked on
		],
		otherFeature: [

		]
	},
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
			outputDir: 'tests/allure-results'
		}
	},

	mochaOpts: {
		ui: 'bdd',
		compilers: ['js:babel-core/register'],
		timeout: 20000
	},
};
