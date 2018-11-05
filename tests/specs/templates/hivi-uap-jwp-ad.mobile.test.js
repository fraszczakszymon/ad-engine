import hiviUapJwp from '../../pages/hivi-uap-jwp-ad.page';
import adSlots from '../../common/adSlots';
import { timeouts } from '../../common/timeouts';
import helpers from '../../common/helpers';

const { expect } = require('chai');

describe('Mobile HiVi UAP JWP ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
	});

	it('Check if top leaderboard is existing, but not immediately visible', () => {
		expect(browser.isExisting(`${adSlots.topLeaderboard}${adSlots.resultAttribute}`),
			'Top leaderboard visible')
			.to
			.be
			.false;
	});

	it('Check if top leaderboard does not load after manually finishing the queue', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		expect(browser.isExisting(adSlots.lineItemIdAttribute), 'Top leaderboard has been loaded')
			.to
			.be
			.false;
	});
});

describe('Mobile HiVi UAP JWP ads page: top boxad (ads loaded after 10s)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
		browser.scroll(0, 5000);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if top boxad is existing, but not immediately visible', () => {
		expect(browser.isExisting(`${adSlots.topBoxad}${adSlots.resultAttribute}`), 'Top boxad visible')
			.to
			.be
			.false;
	});

	it('Check if the ad loaded after delay is visible and if it is the inhouse one', () => {
		hiviUapJwp.waitToLoadAds();
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Slot not in viewport')
			.to
			.be
			.true;
		expect(browser.element(adSlots.topBoxad)
			.getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.inHouseLineItemId, 'Wrong ad loaded');
	});
});

describe('Mobile HiVi UAP JWP ads page: top boxad (ads loaded after clicking the button)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
		browser.waitUntil(
			() => browser.getText(hiviUapJwp.loadAdsButton) === 'Load UAP:JWP (7s)',
			timeouts.standard,
			'Button not loaded',
			timeouts.interval);
		browser.click(hiviUapJwp.loadAdsButton);
		browser.scroll(0, 5000);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if top boxad shows up after clicking the button', () => {
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Slot not in viewport')
			.to
			.be
			.true;
	});

	it('Check if slot was viewed', () => {
		helpers.waitForViewed(adSlots.topBoxad);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Top boxad slot failed to load');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Top boxad slot has not been counted as viewed');
	});

	it('Check if slot has UAP ad line item ID', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.uapLineItemId, 'Wrong ad loaded:');
	});
});

describe('Mobile HiVi UAP JWP ads page: incontent boxad (ads loaded after 10s)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		hiviUapJwp.waitForAdsAfterDelayAndScrollToAdSlotOnMobile(adSlots.railModule, adSlots.incontentBoxad);
	});
	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if incontent boxad is existing, but not immediately visible', () => {
		expect(browser.isExisting(`${adSlots.incontentBoxad}${adSlots.resultAttribute}`),
			'Incontent boxad visible')
			.to
			.be
			.false;
	});

	it('Check if the ad loaded after delay is the inhouse one', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.incontentBoxad)
			.getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.inHouseLineItemId, 'Wrong ad loaded');
	});
});

describe('Mobile HiVi UAP JWP ads page: incontent boxad (ads loaded after clicking the button)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		hiviUapJwp.waitForAdsAfterClickAndScrollToAdSlotOnMobile(adSlots.railModule, adSlots.incontentBoxad);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot shows up after clicking the button', () => {
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not in viewport')
			.to
			.be
			.true;
	});

	it('Check if slot was viewed', () => {
		helpers.waitForViewed(adSlots.incontentBoxad);
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Incontent boxad slot failed to load');
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Incontent boxad slot has not been counted as viewed');
	});

	it('Check if slot has UAP ad line item ID', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.uapLineItemId, 'Wrong ad loaded');
	});
});
