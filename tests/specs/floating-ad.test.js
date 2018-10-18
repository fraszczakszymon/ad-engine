import floatingAd from '../pages/floating-ad.page';
import adSlots from '../common/adSlots';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Floating ad page: incontent boxad', () => {
	before(() => {
		browser.url(floatingAd.pageLink);
		browser.waitForVisible(adSlots.incontentBoxad);
	});

	it('Check if slot scrolls with the page', () => {
		helpers.slowScroll(2500);
		expect(browser.isExisting(`${adSlots.incontentBoxad}${floatingAd.pinnedTopClass}`))
			.to
			.be
			.false;
	});
});
