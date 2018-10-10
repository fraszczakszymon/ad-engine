import btfOnlyAd from '../pages/btf-only-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('BTF Only ads page: incontent boxad', () => {
	let adStatus;

	before(() => {
		browser.url(btfOnlyAd.pageLink);
		browser.waitForVisible(btfOnlyAd.finishQueueButton, timeouts.standard);
		browser.click(btfOnlyAd.finishQueueButton);
		helpers.slowScroll(2500);
		helpers.waitForExpanded(adSlots.incontentBoxad);
		adStatus = helpers.checkSlotStatus(adSlots.incontentBoxad);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.incontentBoxad, adSlots.boxadWidth, adSlots.boxadHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(adSlots.incontentBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

