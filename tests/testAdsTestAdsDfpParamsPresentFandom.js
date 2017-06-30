phantom.casperTest = true;

var config = require('config.json');
var casper = require("casper").create();

casper.test.begin('first test', 1, function(test) {
    casper.start(config.url.floatingAd, function() {

        var expectedlLineItemId = /\d{9}/;
        var expectedCreativeId = /\d{12}/;
        var expectedDataSize = '{"728x0":[[728,90]]}';
        var expectedCreativeSize = '[300,250]';
        var expectedPageLevelTargeting = '{"s1":"_project43"}';
        var expectedSlotTargeting = '{"loc":"top","pos":"TOP_LEADERBOARD","src":"gpt"}';
        var expectedSlotResults = 'success';

        casper.waitForResource('https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDL0suR1gEQARgBMggtHRiVJ9zWuA', function() {

            var actualLineItemId = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-gpt-line-item-id');
            });
            var actualCretiveId = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-gpt-creative-id');
            });
            var actualCreativeSize = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-gpt-creative-size');
            });
            var actualDataSize = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-sizes');
            });
            var actualPageLevelTargeting = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-gpt-page-params');
            });
            var actualSlotTargeting = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-gpt-slot-params');
            });
            var actualSlotResults = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-slot-result');
            });

            test.assertEquals(actualPageLevelTargeting, expectedPageLevelTargeting, actualPageLevelTargeting  + ' equals ' + expectedPageLevelTargeting);
            test.assertEquals(actualSlotTargeting, expectedSlotTargeting,  actualSlotTargeting + ' equals ' + expectedSlotTargeting);
            test.assertEquals(actualCreativeSize, expectedCreativeSize, actualCreativeSize + ' equals ' + expectedCreativeSize);
            test.assertEquals(actualDataSize, expectedDataSize, actualDataSize + ' equals ' + expectedDataSize);
            test.assertEquals(actualSlotResults, expectedSlotResults, actualSlotResults + ' equals ' + expectedSlotResults);
            test.assertTruthy(expectedlLineItemId.test(actualLineItemId), 'LineItemId contains 9 numbers');
            test.assertTruthy(expectedCreativeId.test(actualCretiveId), 'CreativeId contains 12 numbers');
        });
    }).run();

});
