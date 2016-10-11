// Karma configuration
// Generated on Wed Oct 21 2015 17:34:52 GMT-0700 (PDT)

module.exports = function(config) {
	'use strict';

	var configuration = {
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jspm', 'qunit'],

		// list of files / patterns to load in the browser
		files: [
			'./node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js'
		],

		jspm: {
			config: 'config.js',
			loadFiles: [
				'spec/**/*.spec.js'
			],
			serveFiles: [
				'spec/**/!(*spec).js',
				'src/**/*.js'
			]
		},

		proxies: {
			'/spec': '/base/spec/',
			'/src': '/base/src/',
			'/jspm_packages': '/base/jspm_packages/'
		},

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'src/**/*.js': ['babel', 'sourcemap', 'coverage'],
			'spec/**/!(*spec).js': ['babel', 'sourcemap', 'coverage']
		},

		babelPreprocessor: {
			options: {
				sourceMap: 'inline',
				blacklist: ['useStrict']
			},
			sourceFileName: function(file) {
				return file.originalPath;
			}
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['coverage', 'progress'],

		coverageReporter: {
			instrumenters: {isparta: require('isparta')},
			instrumenter: {
				'src/**/*.js': 'isparta'
			},

			reporters: [
				{
					type: 'text-summary',
					subdir: normalizationBrowserName
				}
			]
		},

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO
	};

	config.set(configuration);

	function normalizationBrowserName(browser) {
		return browser.toLowerCase().split(/[ /-]/)[0];
	}
};
