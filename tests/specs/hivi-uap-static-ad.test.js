import hiviUapStatic from '../pages/hivi-uap-static-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');


describe('HiVi UAP static ads page: top leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let scrollDimensions;
	let refreshDimensions;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		helpers.waitForExpanded(adSlots.topLeaderboard);

		defaultDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, 4, 'Default');

		helpers.slowScroll(500);

		scrollDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, 10, 'Default');

		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);

		refreshDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, 10, 'Default');
	});

	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check default dimensions', () => {
		expect(defaultDimensions.status, defaultDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check resolved dimensions after scroll', () => {
		expect(scrollDimensions.status, scrollDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check resolved dimensions after refresh', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(hiviUapStatic.topLineItemId, 'Line item ID mismatch');
	});

	it('Check closing top leaderboard', () => {
		browser.click(hiviUapStatic.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(hiviUapStatic.slotCollapsed, 'Top leaderboard has not been closed');
	});
});

describe('HiVi UAP static ads page: top boxad', () => {
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
			.equal(hiviUapStatic.topLineItemId, 'Line item ID mismatch');
	});
});

describe('HiVi UAP static ads page: incontent boxad', () => {
	before(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
	});
});

describe('HiVi UAP static ads page: bottom leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
	});

	beforeEach(() => {
		helpers.slowScroll(7000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
		adStatus = helpers.checkSlotStatus(adSlots.bottomLeaderboard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotSize(adSlots.bottomLeaderboard, adSlots.uapBottomLeaderboardWidth, adSlots.uapBottomLeaderboardHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if slot is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check if redirect on click works properly', () => {
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});
