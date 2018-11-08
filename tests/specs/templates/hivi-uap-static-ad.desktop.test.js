import hiviUapStatic from '../../pages/hivi-uap-static-ad.page';
import adSlots from '../../common/adSlots';
import { timeouts } from '../../common/timeouts';
import helpers from '../../common/helpers';

const { expect } = require('chai');

describe('Desktop HiVi UAP static ads page: top leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let scrollDimensions;
	let refreshDimensions;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		helpers.waitForExpanded(adSlots.topLeaderboard);

		defaultDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.defaultDesktopRatio);

		helpers.slowScroll(500);

		scrollDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.resolvedDesktopRatio);

		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);

		refreshDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.resolvedDesktopRatio);
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

	it('Check if redirect on click works', () => {
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check if closing top leaderboard works', () => {
		browser.click(hiviUapStatic.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(hiviUapStatic.slotCollapsed, 'Top leaderboard has not been closed');
	});

	it('Check visual regression in top leaderboard (default)', () => {
		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		browser.checkElement(adSlots.topLeaderboard);
	});

	it('Check visual regression in top leaderboard (resolved)', () => {
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);
		browser.checkElement(adSlots.topLeaderboard);
	});
});

describe('Desktop HiVi UAP static ads page: top boxad', () => {
	before(() => {
		browser.url(hiviUapStatic.pageLink);
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

describe('Desktop HiVi UAP static ads page: incontent boxad', () => {
	before(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(hiviUapStatic.secondCall, 'Line item ID mismatch');
	});
});

describe('Desktop HiVi UAP static ads page: bottom leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let refreshDimensions;

	before(() => {
		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		helpers.slowScroll(7000);
		helpers.waitForExpanded(adSlots.bottomLeaderboard);

		defaultDimensions = helpers.checkDerivativeSizeSlotRatio(adSlots.bottomLeaderboard, helpers.wrapper,
			adSlots.defaultDesktopRatio);

		browser.refresh();
		helpers.slowScroll(7000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);

		refreshDimensions = helpers.checkDerivativeSizeSlotRatio(adSlots.bottomLeaderboard, helpers.wrapper,
			adSlots.resolvedDesktopRatio);
	});

	beforeEach(() => {
		adStatus = helpers.getSlotStatus(adSlots.bottomLeaderboard);
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

	it('Check if resolved dimensions after refresh are correct', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(hiviUapStatic.secondCall, 'Line item ID mismatch');
	});

	it('Check if redirect on click works', () => {
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check visual regression in bottom leaderboard (resolved)', () => {
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);
		browser.scroll(0, 7000);
		browser.waitForVisible(adSlots.bottomLeaderboard);
		browser.checkElement(adSlots.bottomLeaderboard);
	});
});
