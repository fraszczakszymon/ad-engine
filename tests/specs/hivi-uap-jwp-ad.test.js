import hiviUapJwp from '../pages/hivi-uap-jwp-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Hivi UAP JWP ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
	});

	it('Check if top leaderboard is not immediately visible', () => {
		expect(browser.isExisting(`${adSlots.topLeaderboard}${hiviUapJwp.resultAttribute}`), 'Top leaderboard visible')
			.to
			.be
			.false;
	});

	it('Check visibility and dimensions', () => {
		const tableOfErrors = [];

		hiviUapJwp.waitToLoadAds();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(topLeaderboardSize.width)
				.to
				.equal(adSlots.leaderboardWidth, 'Width incorrect');
			expect(topLeaderboardSize.height)
				.to
				.equal(adSlots.leaderboardHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
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

	it('Check redirect on click', () => {
		hiviUapJwp.waitToLoadAds();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.waitForEnabled(adSlots.topLeaderboard, timeouts.standard);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});

	it('Check if top leaderboard does not load after manually finishing the queue', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		expect(browser.isExisting(adSlots.lineItemParam), 'Top leaderboard has been loaded')
			.to
			.be
			.false;
	});
});

describe('Hivi UAP JWP ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
	});

	it('Check if top boxad is not immediately visible', () => {
		expect(browser.isExisting(`${adSlots.topBoxad}${hiviUapJwp.resultAttribute}`), 'Top boxad visible')
			.to
			.be
			.false;
	});

	it('Check visibility, dimensions and if the loaded ad is the inhouse one', () => {
		hiviUapJwp.waitToLoadAds();
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);

		const topBoxadSize = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(topBoxadSize.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(topBoxadSize.height)
				.to
				.equal(adSlots.boxadHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad not visible in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		try {
			expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
				.to
				.equal(hiviUapJwp.inHouseLineItemId, 'Wrong ad loaded');
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check if top boxad shows up after clicking the button, if it was viewed and if it uap ad', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		browser.waitUntil(() => browser.element(adSlots.topBoxad).getAttribute(hiviUapJwp.viewedAttribute) === hiviUapJwp.adViewed, timeouts.standard, 'Slot has not been viewed', helpers.interval);
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topBoxad).getAttribute(hiviUapJwp.resultAttribute))
			.to
			.equal(hiviUapJwp.adLoaded, 'Top boxad slot failed to load');
		expect(browser.element(adSlots.topBoxad).getAttribute(hiviUapJwp.viewedAttribute))
			.to
			.equal(hiviUapJwp.adViewed, 'Top boxad slot has not been counted as viewed');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUapJwp.uapLineItemId);
	});

	it('Check redirect on click', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		browser.waitUntil(() => browser.element(adSlots.topBoxad).getAttribute('data-gpt-line-item-id') !== null, timeouts.standard, 'No line item id attribute', helpers.interval);
		browser.waitForEnabled(adSlots.topBoxad, timeouts.standard);
		browser.click(adSlots.topBoxad);
		helpers.waitForNewTab();

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

describe('Hivi UAP JWP ads page: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
	});
	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if incontent boxad is not immediately visible', () => {
		expect(browser.isExisting(`${adSlots.incontentBoxad}${hiviUapJwp.resultAttribute}`), 'Incontent boxad visible')
			.to
			.be
			.false;
	});

	it('Check visibility, dimensions and if the loaded ad is the inhouse one', () => {
		hiviUapJwp.waitToLoadAds();
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);

		const incontentBoxadSize = browser.getElementSize(adSlots.incontentBoxad);
		const tableOfErrors = [];

		try {
			expect(incontentBoxadSize.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(incontentBoxadSize.height)
				.to
				.equal(adSlots.boxadHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not visible in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemParam))
				.to
				.equal(hiviUapJwp.inHouseLineItemId, 'Wrong ad loaded');
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check if incontent boxad shows up after clicking the button and if it was viewed', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		browser.waitUntil(() => browser.element(adSlots.incontentBoxad).getAttribute(hiviUapJwp.viewedAttribute) === hiviUapJwp.adViewed, timeouts.standard, 'Slot has not been viewed', helpers.interval);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not in viewport')
			.to
			.be
			.true;
		expect(browser.element(adSlots.incontentBoxad).getAttribute(hiviUapJwp.resultAttribute))
			.to
			.equal(hiviUapJwp.adLoaded, 'Incontent boxad slot failed to load');
		expect(browser.element(adSlots.incontentBoxad).getAttribute(hiviUapJwp.viewedAttribute))
			.to
			.equal(hiviUapJwp.adViewed, 'Incontent boxad slot has not been counted as viewed');
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUapJwp.uapLineItemId, 'Wrong ad loaded');
	});
});
