import hiviUapStatic from '../pages/hivi-uap-static-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');


describe('Hivi uap static ads: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check line item id', () => {
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
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
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});

	it('Check closing the top leaderboard', () => {
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
		const defaultSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(defaultSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Default width incorrect');
			expect(defaultSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeight, 'Default height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		helpers.slowScroll(300);

		const resolvedSize = browser.getElementSize(adSlots.topLeaderboard, timeouts.standard);

		try {
			expect(resolvedSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Resolved width incorrect');
			expect(resolvedSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeightResolved, 'Resolved height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
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
		const defaultSize = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(defaultSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Default width incorrect');
			expect(defaultSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeight, 'Default height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		browser.refresh();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const resolvedSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(resolvedSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Resolved width incorrect');
			expect(resolvedSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeightResolved, 'Resolved height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
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

describe('Hivi uap static ads: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad not in viewport')
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

	it('Check line item id', () => {
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUapStatic.topLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

describe('Hivi uap static ads: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.incontentBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not in viewport')
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

	it('Check line item id', () => {
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		browser.click(adSlots.incontentBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

describe('Hivi uap static ads: bottom leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapStatic.pageLink);
		browser.reload();
		helpers.slowScroll(7000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.bottomLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.uapBottomLeaderboardWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.uapBottomLeaderboardHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard), 'Bottom leaderboard not in viewport')
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

	it('Check line item id', () => {
		expect(browser.element(adSlots.bottomLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUapStatic.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		browser.click(adSlots.bottomLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

