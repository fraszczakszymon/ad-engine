import hiviUapStatic from '../../pages/hivi-uap-static-ad.page';
import adSlots from '../../common/adSlots';
import { timeouts } from '../../common/timeouts';
import helpers from '../../common/helpers';

const { expect } = require('chai');

describe('Mobile HiVi UAP static ads page: top leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let scrollDimensions;
	let refreshDimensions;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		helpers.waitForExpanded(adSlots.topLeaderboard);

		defaultDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.defaultMobileRatio);

		helpers.slowScroll(500);

		scrollDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.resolvedMobileRatio);

		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);

		refreshDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.resolvedMobileRatio);
	});

	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.topLeaderboard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if default dimensions are correct', () => {
		expect(defaultDimensions.status, defaultDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after scroll are correct', () => {
		expect(scrollDimensions.status, scrollDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after refresh are correct', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(hiviUapStatic.firstCall, 'Line item ID mismatch');
	});

	it('Check if navbar is visible in viewport', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
			.to
			.be
			.true;
	});

	it('Check if redirect on tap works', () => {
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check if closing top leaderboard works', () => {
		browser.waitForVisible(hiviUapStatic.closeLeaderboardButton);
		browser.click(hiviUapStatic.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(hiviUapStatic.slotCollapsed, 'Top leaderboard has not been closed');
	});
});

describe('Mobile HiVi UAP static ads page: top boxad', () => {
	before(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.scroll(0, 5000);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad))
			.to
			.equal(hiviUapStatic.secondCall, 'Line item ID mismatch');
	});
});

describe('Mobile HiVi UAP static ads page: incontent boxad', () => {
	before(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.scroll(0, 6000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(hiviUapStatic.secondCall, 'Line item ID mismatch');
	});
});
