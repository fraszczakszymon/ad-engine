import { expect } from 'chai';
import { hiviUap } from '../../../pages/hivi-uap-ad.page';
import { adSlots } from '../../../common/ad-slots';
import { timeouts } from '../../../common/timeouts';
import { helpers } from '../../../common/helpers';

describe('Mobile HiVi UAP ads page: top leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let scrollDimensions;
	let refreshDimensions;
	let videoFinishedDimensions;

	before(() => {
		browser.url(hiviUap.pageLink);
		adSlots.waitForSlotExpanded(adSlots.topLeaderboard);

		defaultDimensions = adSlots.checkUAPSizeSlotRatio(
			adSlots.topLeaderboard,
			adSlots.defaultMobileRatio,
		);

		helpers.slowScroll(500);

		scrollDimensions = adSlots.checkUAPSizeSlotRatio(
			adSlots.topLeaderboard,
			adSlots.resolvedMobileRatio,
		);

		helpers.reloadPageAndWaitForSlot(adSlots.topLeaderboard);
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);

		refreshDimensions = adSlots.checkUAPSizeSlotRatio(
			adSlots.topLeaderboard,
			adSlots.resolvedMobileRatio,
		);

		helpers.reloadPageAndWaitForSlot(adSlots.topLeaderboard);
		helpers.waitForVideoAdToFinish(hiviUap.videoDuration);
		adSlots.waitForSlotResolved(adSlots.topLeaderboard, adSlots.resolvedMobileRatio);

		videoFinishedDimensions = adSlots.checkUAPSizeSlotRatio(
			adSlots.topLeaderboard,
			adSlots.resolvedMobileRatio,
		);
	});

	beforeEach(() => {
		helpers.closeNewTabs();
		browser.url(hiviUap.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.scroll(0, 0);
		adStatus = adSlots.getSlotStatus(adSlots.topLeaderboard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if default dimensions are correct', () => {
		expect(defaultDimensions.status, defaultDimensions.capturedErrors).to.be.true;
	});

	it('Check if resolved dimensions after scroll are correct', () => {
		expect(scrollDimensions.status, scrollDimensions.capturedErrors).to.be.true;
	});

	it('Check if resolved dimensions after refresh are correct', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors).to.be.true;
	});

	it('Check if resolved dimensions after video finished playing are correct', () => {
		expect(videoFinishedDimensions.status, videoFinishedDimensions.capturedErrors).to.be.true;
	});

	it('Check if navbar is visible in viewport', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible').to.be.true;
	});

	it('Check redirect to new page', () => {
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect').to.be.true;
	});

	it('Check if the line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard)).to.equal(
			hiviUap.firstCall,
			'Line item ID mismatch',
		);
	});

	it('Check closing top leaderboard after clicking the button', () => {
		browser.waitForEnabled(hiviUap.closeLeaderboardButton, timeouts.standard);
		browser.click(hiviUap.closeLeaderboardButton);
		adSlots.waitForSlotCollapsed(adSlots.topLeaderboard);
	});
});

describe('Mobile HiVi UAP ads page: video player in top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitToStartPlaying();
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`);
	});

	it('Check if opening the full screen player works', () => {
		browser.waitForEnabled(
			`${adSlots.topLeaderboard} ${hiviUap.playerFullscreenButton}`,
			timeouts.standard,
		);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.playerFullscreenButton}`);
		browser.waitForExist(hiviUap.fullScreen, timeouts.standard);
	});

	it('Check if pausing the video works', () => {
		browser.waitForEnabled(
			`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`,
			timeouts.standard,
		);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`);
		browser.waitForExist(
			`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}${hiviUap.buttonIsOn}`,
			timeouts.standard,
			true,
		);
	});

	it('Check if unmuting the video works', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}`);
		browser.waitForExist(
			`${adSlots.topLeaderboard} ${hiviUap.volumeButton}${hiviUap.buttonIsOn}`,
			timeouts.standard,
			true,
		);
	});

	it('Check if replaying the video works', () => {
		helpers.waitForVideoAdToFinish(hiviUap.videoDuration);
		browser.waitForExist(`${hiviUap.videoPlayer}${helpers.classHidden}`, timeouts.standard);
		helpers.switchToFrame(hiviUap.topPlayerFrame);
		browser.waitForVisible(hiviUap.replayOverlay, timeouts.standard);
		browser.click(hiviUap.replayOverlay);
		browser.frame();
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`, timeouts.standard);
	});
});

describe('Mobile HiVi UAP ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.scroll(0, 5000);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad)).to.equal(
			hiviUap.secondCall,
			'Line item ID mismatch',
		);
	});
});

describe('Mobile HiVi UAP ads page: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.scroll(adSlots.railModule);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		browser.scroll(adSlots.incontentBoxad);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad)).to.equal(
			hiviUap.secondCall,
			'Line item ID mismatch',
		);
	});
});
