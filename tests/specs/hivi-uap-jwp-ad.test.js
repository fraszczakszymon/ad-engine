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
		expect(browser.isExisting(`${adSlots.topLeaderboard}${adSlots.resultAttribute}`), 'Top leaderboard visible')
			.to
			.be
			.false;
	});

	it('Check dimensions and visibility', () => {
		const tableOfErrors = [];

		hiviUapJwp.waitToLoadAds();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const dimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.leaderboardWidth, adSlots.leaderboardHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;

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
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check if top leaderboard does not load after manually finishing the queue', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		expect(browser.isExisting(adSlots.lineItemIdAttribute), 'Top leaderboard has been loaded')
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
		expect(browser.isExisting(`${adSlots.topBoxad}${adSlots.resultAttribute}`), 'Top boxad visible')
			.to
			.be
			.false;
	});

	it('Check visibility, dimensions and if the loaded ad is the inhouse one', () => {
		hiviUapJwp.waitToLoadAds();
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);

		const dimensions = helpers.checkSlotSize(adSlots.topBoxad, adSlots.boxadWidth, adSlots.boxadHeight);
		const tableOfErrors = [];

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad not visible in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		try {
			expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemIdAttribute))
				.to
				.equal(hiviUapJwp.inHouseLineItemId, 'Wrong ad loaded');
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check if top boxad shows up after clicking the button, if it was viewed and if it is uap ad', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		helpers.waitForViewed(adSlots.topBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Top boxad slot failed to load');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Top boxad slot has not been counted as viewed');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.uapLineItemId);
	});

	it('Check redirect on click', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		expect(helpers.adRedirect(adSlots.topBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
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
		expect(browser.isExisting(`${adSlots.incontentBoxad}${adSlots.resultAttribute}`), 'Incontent boxad visible')
			.to
			.be
			.false;
	});

	it('Check visibility, dimensions and if the loaded ad is the inhouse one', () => {
		hiviUapJwp.waitToLoadAds();
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);

		const dimensions = helpers.checkSlotSize(adSlots.incontentBoxad, adSlots.boxadWidth, adSlots.boxadHeight);
		const tableOfErrors = [];

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;

		try {
			expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not visible in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemIdAttribute))
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
		helpers.waitForViewed(adSlots.incontentBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not in viewport')
			.to
			.be
			.true;
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Incontent boxad slot failed to load');
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Incontent boxad slot has not been counted as viewed');
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.uapLineItemId, 'Wrong ad loaded');
	});
});
