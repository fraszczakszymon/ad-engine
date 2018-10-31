import abcdAd from '../pages/abcd-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('ABCD ads page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(abcdAd.pageLink);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.topLeaderboard);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, abcdAd.abcdLeaderboardRatio);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the proper campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(abcdAd.topLeaderboardLineItemId, 'Line item ID mismatch');
	});

	it('Check if navbar is visible in viewport', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
			.to
			.be
			.true;
	});

	it('Check if redirect on click works', () => {
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('ABCD ads page: video player in leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(abcdAd.pageLink);
	});
	beforeEach(() => {
		browser.waitForVisible(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`, timeouts.standard);
		adStatus = helpers.getSlotStatus(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`);
		helpers.waitToStartPlaying();
	});

	it('Check if player is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if unmuting the video works properly', () => {
		browser.moveToObject(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`);
		browser.click(abcdAd.unmuteButton);
		browser.waitForExist(`${abcdAd.unmuteButton}${abcdAd.buttonIsOnClass}`, timeouts.standard, true);
	});
});
