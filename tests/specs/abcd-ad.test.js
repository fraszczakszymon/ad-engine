import abcdAd from '../pages/abcd-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('ABCD ads page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(abcdAd.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 5);

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
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(abcdAd.topLeaderboardLineItemId, 'Line item ID mismatch');
	});

	it('Check if leaderboard does not obstruct the navbar', () => {
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
});

describe('ABCD ads page: video player in leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(abcdAd.pageLink);
		adStatus = helpers.checkSlotStatus(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`);
	});

	beforeEach(() => {
		browser.waitForVisible(abcdAd.videoPlayer, timeouts.standard);
		helpers.waitToStartPlaying();
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check unmuting the video', () => {
		browser.moveToObject(`${adSlots.topLeaderboard} ${abcdAd.videoPlayer}`);
		browser.click(abcdAd.unmuteButton);
		browser.waitForExist(`${abcdAd.unmuteButton}${abcdAd.buttonIsOnClass}`, timeouts.standard, true);
	});
});
