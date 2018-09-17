exports.config = {
	specs: [
		'./tests/specs/**/*.js'
	],
	suites: {
		porvata: [
			'./tests/specs/porvata.test.js',
		],
		btfOnly: [
			'./tests/specs/btf-only-ad.test.js',
		],
		floatingAd: [
			'./tests/specs/floating-ad.test.js',
		],
		repeatableSlots: [
			'./tests/specs/repeatable-slots.test.js',
		],
		topBoxad: [
			'./tests/specs/top-boxad-ad.test.js',
		],
		topLeaderboard: [
			'./tests/specs/top-leaderboard-ad.test.js',
		],
		delayAd: [
			'./tests/specs/delay-ad.test.js',
		],
		animationsAd: [
			'./tests/specs/animations-ad.test.js',
		],
		viewportConflictAd: [
			'./tests/specs/viewport-conflict-ad.test.js',
		],
		blockbtfAd: [
			'./tests/specs/block-btf-ad.test.js',
		],
		emptyResponse: [
			'./tests/specs/empty-response.test.js',
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
			outputDir: 'allure-results'
		}
	},

	mochaOpts: {
		ui: 'bdd',
		compilers: ['js:babel-core/register'],
		timeout: 20000
	},
};
