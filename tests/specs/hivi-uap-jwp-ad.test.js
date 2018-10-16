import hiviUapJwp from '../pages/hivi-uap-jwp-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('HiVi UAP JWP ads page: top leaderboard', () => {
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

	it('Check if top leaderboard does not load after manually finishing the queue', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		expect(browser.isExisting(adSlots.lineItemIdAttribute), 'Top leaderboard has been loaded')
			.to
			.be
			.false;
	});
});

describe('HiVi UAP JWP ads page: top boxad', () => {
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

	it('Check if the ad loaded after delay is visible and if it is the inhouse one', () => {
		hiviUapJwp.waitToLoadAds();
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.inHouseLineItemId, 'Wrong ad loaded');
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
});

describe('HiVi UAP JWP ads page: incontent boxad', () => {
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

	it('Check if the ad loaded after delay is the inhouse one', () => {
		hiviUapJwp.waitToLoadAds();
		helpers.slowScroll(1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad))
			.to
			.be
			.true;
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemIdAttribute))
			.to
			.equal(hiviUapJwp.inHouseLineItemId, 'Wrong ad loaded');
	});

	it('Check if incontent boxad shows up after clicking the button, if it was viewed and if it is UAP ad', () => {
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
