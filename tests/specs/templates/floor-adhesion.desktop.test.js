import floorAdhesion from '../../pages/floor-adhesion.page';
import { timeouts } from '../../common/timeouts';
import helpers from '../../common/helpers';
import adSlots from '../../common/adSlots';

const { expect } = require('chai');

describe('Floor adhesion page: floor adhesion', () => {
	before(() => {
		browser.url(floorAdhesion.pageLink);
		browser.waitForVisible(floorAdhesion.outOfPageWrapper, timeouts.standard);
	});

	it('Check if floor adhesion scrolls with the viewport', () => {
		browser.waitForVisible(floorAdhesion.closeButton, timeouts.standard);

		expect(browser.isVisibleWithinViewport(adSlots.invisibleHighImpact, 'Floor adhesion not in the viewport'))
			.to
			.be
			.true;
		helpers.slowScroll(1500);
		expect(browser.isVisibleWithinViewport(adSlots.invisibleHighImpact, 'Floor adhesion not in the viewport'))
			.to
			.be
			.true;
	});

	it('Check if floor adhesion disappears after clicking close button', () => {
		expect(browser.isVisibleWithinViewport(adSlots.invisibleHighImpact, 'Floor adhesion not in the viewport'))
			.to
			.be
			.true;

		browser.click(floorAdhesion.closeButton);
		expect(browser.isVisibleWithinViewport(adSlots.invisibleHighImpact, 'Floor adhesion is in the viewport'))
			.to
			.be
			.false;
	});
});
