import floatingAd from '../pages/floating-ad.page';
import adSlots from '../common/adSlots';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Floating ad page: incontent boxad', () => {
	before(() => {
		browser.url(floatingAd.pageLink);
		helpers.slowScroll(2500);
		browser.waitForVisible(adSlots.incontentBoxad);
	});

	it('Check if slot scrolls with the page', () => {
		expect(browser.isExisting(`${adSlots.incontentBoxad}${floatingAd.pinnedTopClass}`))
			.to
			.be
			.false;
	});
});
