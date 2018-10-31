import floatingAd from '../../pages/floating-ad.page';
import adSlots from '../../common/adSlots';
import helpers from '../../common/helpers';
import { timeouts } from '../../common/timeouts';

const { expect } = require('chai');

describe('Floating ad page: incontent boxad', () => {
	before(() => {
		browser.url(floatingAd.pageLink);
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if slot scrolls with the page', () => {
		helpers.slowScroll(2500);
		expect(browser.isExisting(`${adSlots.incontentBoxad}${floatingAd.pinnedTopClass}`))
			.to
			.be
			.false;
	});
});
