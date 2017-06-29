/**
 * Created by wojtek on 29/06/2017.
 */

phantom.casperTest = true;

var casper = require('casper').create();

casper.test.begin('first test', 1, function(test) {
    casper.start('http://localhost:5555/examples/templates/floating-ad/', function() {

        var expectedlLineItemId = '271491732';
        var expectedCreativeSize = '[300,250]';
        var expectedPageLevelTargeting = '{"s1":"_project43"}';
        var expectedSlotTargeting = '{"loc":"top","pos":"TOP_LEADERBOARD","src":"gpt"}';
        var expectedSlotResults = 'success';

        casper.waitForResource('https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKDL0suR1gEQARgBMggtHRiVJ9zWuA', function() {

            var actualLineItemId = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-gpt-line-item-id');
            });
            var actualCreativeSize = this.evaluate(function() {
                return __utils__.findOne('#gpt-top-leaderboard').getAttribute('data-gpt-creative-size');
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
            test.assertEquals(actualLineItemId, expectedlLineItemId, actualLineItemId +  ' equals ' + expectedlLineItemId);
            test.assertEquals(actualSlotResults, expectedSlotResults, actualSlotResults + ' equals ' + expectedSlotResults);
        });
    }).run();

});
