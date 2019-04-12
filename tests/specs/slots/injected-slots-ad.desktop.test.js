import { expect } from 'chai';
import { adSlots } from '../../common/ad-slots';
import { injectedAds } from '../../pages/injected-ad.page';
import { timeouts } from '../../common/timeouts';

describe('Injected slots: injected boxad', () => {
	let adStatus;

	before(() => {
		browser.url(injectedAds.pageLink);
		browser.scroll(0, 500);
		browser.waitForVisible(adSlots.injectedBoxad, timeouts.standard);
		adStatus = adSlots.getSlotStatus(adSlots.injectedBoxad);
	});

	it('Check if dimensions are correct', () => {
		const dimensions = adSlots.checkSlotSize(
			adSlots.injectedBoxad,
			adSlots.incontentWidth,
			adSlots.incontentHeight,
		);

		expect(dimensions.status, dimensions.capturedErrors).to.be.true;
	});

	it('Check if module is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});
});