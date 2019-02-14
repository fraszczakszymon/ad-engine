import { expect } from 'chai';
import { delayAd } from '../../pages/delay-ad.page';
import { adSlots } from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';

describe('Delay ads page: top leaderboard', () => {
	let adStatus;

	beforeEach(() => {
		browser.url(delayAd.pageLink);
		browser.waitForVisible(delayAd.loadAdsButton, timeouts.standard);
	});

	it('Check if slot is not immediately visible', () => {
		browser.waitForExist(
			`${adSlots.topLeaderboard}[${adSlots.resultAttribute}]`,
			timeouts.standard,
			true,
		);
	});

	it('Check if slot is visible in viewport after delay', () => {
		delayAd.waitToLoadAds();
		adStatus = adSlots.getSlotStatus(adSlots.topLeaderboard);
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if slot shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		adSlots.waitForSlotViewed(adSlots.topLeaderboard);
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute)).to.equal(
			adSlots.adLoaded,
			'Top leaderboard slot failed to load',
		);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.viewedAttribute)).to.equal(
			adSlots.adViewed,
			'Top leaderboard slot has not been counted as viewed',
		);
	});

	it('Check if redirect on click works properly', () => {
		browser.click(delayAd.loadAdsButton);
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect').to.be.true;
	});
});

describe('Delay ads page: top boxad', () => {
	let adStatus;

	beforeEach(() => {
		browser.url(delayAd.pageLink);
		browser.waitForVisible(delayAd.loadAdsButton, timeouts.standard);
	});

	it('Check if slot is not immediately visible', () => {
		browser.waitForExist(
			`${adSlots.topBoxad}[${adSlots.resultAttribute}]`,
			timeouts.standard,
			true,
		);
	});

	it('Check if slot is visible in viewport after delay', () => {
		delayAd.waitToLoadAds();
		adStatus = adSlots.getSlotStatus(adSlots.topBoxad);
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if slot shows up after clicking the button and if it was viewed', () => {
		browser.click(delayAd.loadAdsButton);
		adStatus = adSlots.getSlotStatus(adSlots.topBoxad);
		adSlots.waitForSlotViewed(adSlots.topBoxad);
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.resultAttribute)).to.equal(
			adSlots.adLoaded,
			'Top boxad slot failed to load',
		);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.viewedAttribute)).to.equal(
			adSlots.adViewed,
			'Top boxad slot has not been counted as viewed',
		);
	});
});
