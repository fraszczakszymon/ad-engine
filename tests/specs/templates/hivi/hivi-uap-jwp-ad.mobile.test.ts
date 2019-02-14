import { expect } from 'chai';
import { hiviUapJwp } from '../../../pages/hivi-uap-jwp-ad.page';
import { adSlots } from '../../../common/ad-slots';
import { timeouts } from '../../../common/timeouts';
import { helpers } from '../../../common/helpers';

describe('Mobile HiVi UAP JWP ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
	});

	it('Check if slot is existing, but the ad is not immediately visible', () => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		expect(
			browser.isExisting(`${adSlots.topLeaderboard}${adSlots.resultAttribute}`),
			'Ad is visible',
		).to.be.false;
	});

	it('Check if top leaderboard does not load after manually finishing the queue', () => {
		browser.click(hiviUapJwp.loadAdsButton);
		browser.waitForExist(hiviUapJwp.staticFrame, timeouts.standard);
		expect(browser.isExisting(adSlots.lineItemIdAttribute), 'Top leaderboard has been loaded').to.be
			.false;
	});
});

describe('Mobile HiVi UAP JWP ads page: top boxad (ads loaded after 10s)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if top boxad is existing, but the ad is not immediately visible', () => {
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		expect(browser.isExisting(`${adSlots.topBoxad}${adSlots.resultAttribute}`), 'Ad is visible').to
			.be.false;
	});

	it('Check if the ad loaded after delay is visible and if it is the inhouse one', () => {
		hiviUapJwp.waitForAdsAfterDelayAndScrollToAdSlotOnMobile(adSlots.topBoxad);
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Slot not in viewport').to.be.true;
	});

	it('Check if the ad is the inhouse one', () => {
		hiviUapJwp.waitForAdsAfterDelayAndScrollToAdSlotOnMobile(adSlots.topBoxad);
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemIdAttribute)).to.equal(
			hiviUapJwp.inHouseLineItemId,
			'Wrong ad loaded',
		);
	});
});

describe('Mobile HiVi UAP JWP ads page: top boxad (ads loaded after clicking the button)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		hiviUapJwp.waitForAdsAfterClickAndScrollToAdSlotOnMobile(adSlots.topBoxad);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if top boxad shows up after clicking the button', () => {
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Slot not in viewport').to.be.true;
	});

	it('Check if slot was viewed', () => {
		adSlots.waitForSlotViewed(adSlots.topBoxad);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.resultAttribute)).to.equal(
			adSlots.adLoaded,
			'Top boxad slot failed to load',
		);
	});

	it('Check if slot has UAP ad line item ID', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemIdAttribute)).to.equal(
			hiviUapJwp.uapLineItemId,
			'Wrong ad loaded:',
		);
	});
});

describe('Mobile HiVi UAP JWP ads page: incontent boxad (ads loaded after 10s)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		browser.waitForVisible(hiviUapJwp.loadAdsButton, timeouts.standard);
	});
	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is existing, but not immediately visible', () => {
		browser.scroll(0, 6000);
		// should exist, but show up after delay and scroll
		browser.waitForExist(adSlots.incontentBoxad, timeouts.standard);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Slot visible in viewport').to
			.be.false;
	});

	it('Check if the ad loaded after delay is the inhouse one', () => {
		hiviUapJwp.waitForAdsAfterDelayAndScrollToAdSlotOnMobile(adSlots.railModule);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		// separate scroll, because this slot is not immediately visible
		browser.scroll(adSlots.incontentBoxad);
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad)).to.be.true;
		expect(helpers.getLineItemId(adSlots.incontentBoxad)).to.equal(
			hiviUapJwp.inHouseLineItemId,
			'Wrong ad loaded',
		);
	});
});

describe('Mobile HiVi UAP JWP ads page: incontent boxad (ads loaded after clicking the button)', () => {
	beforeEach(() => {
		browser.url(hiviUapJwp.pageLink);
		hiviUapJwp.waitForAdsAfterClickAndScrollToAdSlotOnMobile(adSlots.railModule);
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		// separate scroll, because this slot is not immediately visible
		browser.scroll(adSlots.incontentBoxad);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot shows up after clicking the button', () => {
		expect(
			browser.isVisibleWithinViewport(adSlots.incontentBoxad),
			'Incontent boxad not in viewport',
		).to.be.true;
	});

	it('Check if slot was viewed', () => {
		adSlots.waitForSlotViewed(adSlots.incontentBoxad);
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.resultAttribute)).to.equal(
			adSlots.adLoaded,
			'Incontent boxad slot failed to load',
		);
	});

	it('Check if slot has UAP ad line item ID', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad)).to.equal(
			hiviUapJwp.uapLineItemId,
			'Wrong ad loaded',
		);
	});
});
