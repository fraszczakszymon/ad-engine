import { expect } from 'chai';
import { uapRoadblock } from '../../../pages/uap-roadblock.page';
import { adSlots } from '../../../common/ad-slots';
import { timeouts } from '../../../common/timeouts';
import { helpers } from '../../../common/helpers';

describe('Desktop uap roadblock page: top leaderboard', () => {
	let adStatus;

	beforeEach(() => {
		browser.url(uapRoadblock.pageLink);
		adSlots.waitForSlotExpanded(adSlots.topLeaderboard);
		adStatus = adSlots.getSlotStatus(adSlots.topLeaderboard, true);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard)).to.equal(
			uapRoadblock.topLeaderboardLineItemId,
			'Line item ID mismatch',
		);
	});

	it('Check if navbar is visible in viewport', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible').to.be.true;
	});

	it('Check if redirect on click works', () => {
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect').to.be.true;
	});

	it('Check visual regression in top leaderboard (resolved)', () => {
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);
		browser.checkElement(adSlots.topLeaderboard);
	});
});

describe('Desktop uap roadblock page: top boxad', () => {
	before(() => {
		browser.url(uapRoadblock.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad)).to.equal(
			uapRoadblock.topBoxadLineItemId,
			'Line item ID mismatch',
		);
	});
});
