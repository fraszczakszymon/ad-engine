import asserts from '../common/asserts';
import adSlots from '../common/adSlots';
import helpers from '../common/helpers';
import repeatableSlots from '../pages/repeatable-slots.page';
import reusablePrebid from '../pages/reusable-prebid.page';

describe('Reusable prebid', () => {
	it('Check if wikia adapter creative is not rendered when there are no bids', () => {
		browser.url(reusablePrebid.getLinkWithWikiaAdapterParameters());

		asserts.assertInhouseCreative(adSlots.topLeaderboard);
	});

	it('Check if wikia adapter creative is rendered', () => {
		browser.url(reusablePrebid.getLinkWithWikiaAdapterParameters(1410));

		asserts.assertWikiaAdapterCreative(adSlots.topLeaderboard);
	});

	it('Check if wikia adapter creative is rendered for lazy loaded slot when prebid timeouts at the beginning', () => {
		browser.url(reusablePrebid.getLinkWithWikiaAdapterParameters(1410, 0, true, 3000));

		asserts.assertInhouseCreative(adSlots.topLeaderboard);

		browser.pause(4000);
		helpers.slowScroll(5000);

		asserts.assertWikiaAdapterCreative(repeatableSlots.getRepeatableSlot(2));
	});

	it('Check if wikia adapter creative is not rendered when limit of bids is reached', () => {
		browser.url(reusablePrebid.getLinkWithWikiaAdapterParameters(1410, 2, true));

		asserts.assertWikiaAdapterCreative(adSlots.topLeaderboard);
		asserts.assertWikiaAdapterCreative(repeatableSlots.getRepeatableSlot(1));

		helpers.slowScroll(5000);

		asserts.assertInhouseCreative(repeatableSlots.getRepeatableSlot(2));
	});
});
