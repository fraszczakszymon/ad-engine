import floatingRailAd from '../pages/floating-rail-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';
import adSlots from '../common/adSlots';

const { expect } = require('chai');

describe('Floating rail ads page: floating rail', () => {
	before(() => {
		browser.url(floatingRailAd.pageLink);
		browser.waitForVisible(adSlots.railModule, timeouts.standard);
	});

	it('Check if rail scrolls with the content', () => {
		helpers.slowScroll(500);
		expect(browser.element(floatingRailAd.rail).getAttribute(helpers.classProperty))
			.to
			.equal(floatingRailAd.attributeRailScrolling, 'Rail did not scroll');
	});
});
