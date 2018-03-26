/* globals phantom, casper */
phantom.casperTest = true;

var config = require('config.json');
var utils = require('utils');

casper.test.begin('Test ad slot attributes', 1, function(test) {
	casper.start(config.baseUrl + config.pages.floatingAd, function() {
		var testCases = [
			{
				attr: 'data-gpt-creative-id',
				expectedPattern: /\d{12}/
			},
			{
				attr: 'data-gpt-line-item-id',
				expectedPattern: /\d{9}/
			},
			{
				attr: 'data-gpt-creative-size',
				expectedString: '[300,250]'
			},
			{
				attr: 'data-sizes',
				expectedString: '{"728x0":[[728,90]]}'
			},
			{
				attr: 'data-gpt-page-params',
				expectedString: '{"s1":"_project43"}'
			},
			{
				attr: 'data-gpt-slot-params',
				expectedString: '{"loc":"top","src":"test","pos":"TOP_LEADERBOARD"}'
			},
			{
				attr: 'data-slot-result',
				expectedString: 'success'
			}
		];

		casper.waitForResource(
			'https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDL0suR1gEQARgBMggtHRiVJ9zWuA', function() {
				var topLeaderboard = this.getElementInfo('div[id="gpt-top-leaderboard"]');

				testCases.forEach(function(testCase) {
					var actual = topLeaderboard.attributes[testCase.attr];

					if (testCase.expectedPattern) {
						test.assertTruthy(testCase.expectedPattern.test(actual), testCase.attr + 'correctly fits in pattern');
					} else {
						test.assertEquals(actual, testCase.expectedString, testCase.attr + ' equals ' + testCase.expectedString);
					}
				});
			});
	}).runAdQueue();
});
