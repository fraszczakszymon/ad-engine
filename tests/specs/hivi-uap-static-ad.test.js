import hiviUapStatic from '../pages/hivi-uap-static-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');


describe('Hivi uap static ads page: top leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let scrollDimensions;
	let refreshDimensions;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);

		defaultDimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 4, 'Default');

		helpers.slowScroll(500);

		scrollDimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 10, 'Default');

		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);

		refreshDimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 10, 'Default');
	});

	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
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

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check closing top leaderboard', () => {
		browser.click(hiviUapStatic.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(hiviUapStatic.slotCollapsed, 'Top leaderboard has not been closed');
	});
});

describe('Hivi uap static ads page: top boxad', () => {
	let adStatus;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topBoxad);
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

describe('Hivi uap static ads page: incontent boxad', () => {
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

describe('Hivi uap static ads page: bottom leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.bottomLeaderboard);
	});

	beforeEach(() => {
		helpers.slowScroll(7000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.bottomLeaderboard, adSlots.uapBottomLeaderboardWidth, adSlots.uapBottomLeaderboardHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check line item id', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});
