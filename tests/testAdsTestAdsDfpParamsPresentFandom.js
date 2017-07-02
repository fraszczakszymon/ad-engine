phantom.casperTest = true;

var config = require('config.json');
var casper = require("casper").create();
var utils = require('utils');

casper.test.begin('first test', 1, function(test) {
    casper.start(config.url.floatingAd, function() {

        var expectedlLineItemId = /\d{9}/,
            expectedCreativeId = /\d{12}/,
            expectedDataSize = '{"728x0":[[728,90]]}',
            expectedCreativeSize = '[300,250]',
            expectedPageLevelTargeting = '{"s1":"_project43"}',
            expectedSlotTargeting = '{"loc":"top","pos":"TOP_LEADERBOARD","src":"gpt"}',
            expectedSlotResults = 'success';

        casper.waitForResource('https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDL0suR1gEQARgBMggtHRiVJ9zWuA', function() {
            var topLeaderboard = this.getElementInfo('div[id="gpt-top-leaderboard"]'),
                actualCreativeId = topLeaderboard.attributes['data-gpt-creative-id'],
                actualCreativeSize = topLeaderboard.attributes['data-gpt-creative-size'],
                actualDataSize = topLeaderboard.attributes['data-sizes'],
                actualLineItemId = topLeaderboard.attributes['data-gpt-line-item-id'],
                actualPageLevelTargeting = topLeaderboard.attributes['data-gpt-page-params'],
                actualSlotTargeting = topLeaderboard.attributes['data-gpt-slot-params'],
                actualSlotResults = topLeaderboard.attributes['data-slot-result'];

            test.assertEquals(actualPageLevelTargeting, expectedPageLevelTargeting, actualPageLevelTargeting  + ' equals ' + expectedPageLevelTargeting);
            test.assertEquals(actualSlotTargeting, expectedSlotTargeting,  actualSlotTargeting + ' equals ' + expectedSlotTargeting);
            test.assertEquals(actualCreativeSize, expectedCreativeSize, actualCreativeSize + ' equals ' + expectedCreativeSize);
            test.assertEquals(actualDataSize, expectedDataSize, actualDataSize + ' equals ' + expectedDataSize);
            test.assertEquals(actualSlotResults, expectedSlotResults, actualSlotResults + ' equals ' + expectedSlotResults);
            test.assertTruthy(expectedCreativeId.test(actualCreativeId), 'CreativeId contains 12 numbers');
            test.assertTruthy(expectedlLineItemId.test(actualLineItemId), 'LineItemId contains 9 numbers');

        });
    }).run();

});
