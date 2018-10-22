import interstitial from '../pages/interstitial.page';
import { timeouts } from '../common/timeouts';
import adSlots from '../common/adSlots';

const { expect } = require('chai');

describe('Interstitial page: interstitial', () => {
	before(() => {
		browser.url(interstitial.pageLink);
		browser.waitForVisible(interstitial.outOfPageWrapper, timeouts.standard);
	});

	it('Check if interstitial is displayed with close button and advertisement label', () => {
		browser.waitForVisible(interstitial.closeButton, timeouts.standard);
		browser.waitForVisible(interstitial.advertisementLabel, timeouts.standard);

		expect(browser.isVisibleWithinViewport(adSlots.invisibleHighImpact, 'Floor adhesion not in the viewport'))
			.to
			.be
			.true;
	});

	it('Check if interstitial disappears after clicking close button', () => {
		expect(browser.isVisibleWithinViewport(adSlots.invisibleHighImpact, 'Floor adhesion not in the viewport'))
			.to
			.be
			.true;
		expect(browser.element('html').getAttribute('class'))
			.to
			.include('stop-scrolling', 'Document does not have .stop-scrolling class');

		browser.click(interstitial.closeButton);
		expect(browser.isVisibleWithinViewport(adSlots.invisibleHighImpact, 'Floor adhesion is in the viewport'))
			.to
			.be
			.false;
		expect(browser.element('html').getAttribute('class'))
			.not
			.to
			.include('stop-scrolling', 'Document still has .stop-scrolling class');
	});
});
