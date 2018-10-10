import hiviUapStatic from '../pages/hivi-uap-static-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');


describe('Hivi uap static ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check line item id', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(hiviUapStatic.topLineItemId, 'Line item ID mismatch');
	});

	it('Check if it does not obstruct the navbar', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check closing the top leaderboard', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUapStatic.closeLeaderboardButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUapStatic.closeLeaderboardButton}`);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(hiviUapStatic.slotResult))
			.to
			.equal(hiviUapStatic.slotCollapsed, 'Slot has not collapsed');
	});

	it('Check unsticking after scroll', () => {
		helpers.slowScroll(3000);
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard in viewport')
			.to
			.be
			.false;
	});

	it('Check default and resolved state after scroll', () => {
		const tableOfErrors = [];

		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		helpers.waitForExpanded(adSlots.topLeaderboard);

		const defaultDimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.adProductsTopLeaderboardWidth, adSlots.uapTopLeaderboardHeight, 'Default:');

		expect(defaultDimensions.status, defaultDimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		helpers.slowScroll(500);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const resolvedDimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.adProductsTopLeaderboardWidth, adSlots.uapTopLeaderboardHeightResolved, 'Resolved:');

		expect(resolvedDimensions.status, resolvedDimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});


	it('Check default and resolved state after refresh', () => {
		const tableOfErrors = [];

		helpers.reloadPageAndWaitForSlot(hiviUapStatic.pageLink, adSlots.topLeaderboard);
		helpers.waitForExpanded(adSlots.topLeaderboard);

		const defaultDimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.adProductsTopLeaderboardWidth, adSlots.uapTopLeaderboardHeight, 'Default:');

		expect(defaultDimensions.status, defaultDimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		helpers.refreshPage();
		helpers.waitForExpanded(adSlots.topLeaderboard);

		const resolvedDimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.adProductsTopLeaderboardWidth, adSlots.uapTopLeaderboardHeightResolved);

		expect(resolvedDimensions.status, resolvedDimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});
});

describe('Hivi uap static ads page: top boxad', () => {
	let adStatus;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topBoxad);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topBoxad, adSlots.boxadWidth, adSlots.boxadHeight);

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
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad))
			.to
			.equal(hiviUapStatic.topLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(adSlots.topBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Hivi uap static ads page: incontent boxad', () => {
	let adStatus;

	before(() => {
		browser.url(hiviUapStatic.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.incontentBoxad);
	});

	beforeEach(() => {
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.incontentBoxad, adSlots.boxadWidth, adSlots.boxadHeight);

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
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(adSlots.incontentBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
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
