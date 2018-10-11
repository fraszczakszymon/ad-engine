import delayAd from '../pages/delay-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Delay ads page: top leaderboard', () => {
	let adStatus;

	beforeEach(() => {
		browser.url(delayAd.pageLink);
		browser.waitForVisible(delayAd.loadAdsButton, timeouts.standard);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);
	});

	it('Check if slot is not immediately visible', () => {
		browser.waitForExist(`${adSlots.topLeaderboard}[${adSlots.resultAttribute}]`, timeouts.standard, true);
	});

	it('Check visibility after delay', () => {
		delayAd.waitToLoadAds();
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if slot shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		helpers.waitForViewed(adSlots.topLeaderboard);
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Top leaderboard slot failed to load');
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Top leaderboard slot has not been counted as viewed');
	});

	it('Check redirect on click', () => {
		browser.click(delayAd.loadAdsButton);
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Delay ads page: top boxad', () => {
	let adStatus;

	before(() => {
		browser.url();
		adStatus = helpers.checkSlotStatus(adSlots.topBoxad);
	});

	beforeEach(() => {
		browser.url(delayAd.pageLink);
		browser.waitForVisible(helpers.pageBody, timeouts.standard);
	});

	it('Check if slot is not immediately visible', () => {
		browser.waitForExist(`${adSlots.topBoxad}[${adSlots.resultAttribute}]`, timeouts.standard, true);
	});

	it('Check visibility after delay', () => {
		delayAd.waitToLoadAds();
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if slot shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		helpers.waitForViewed(adSlots.topBoxad);
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.resultAttribute))
			.to
			.equal(adSlots.adLoaded, 'Top boxad slot failed to load');
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.viewedAttribute))
			.to
			.equal(adSlots.adViewed, 'Top boxad slot has not been counted as viewed');
	});
});
