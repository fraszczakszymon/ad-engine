import hiviUapCtp from '../../pages/hivi-uap-ctp-ad.page';
import adSlots from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';
import helpers from '../../common/helpers';

const { expect } = require('chai');

describe('Desktop HiVi UAP CTP ads page: top leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let scrollDimensions;
	let refreshDimensions;
	let videoFinishedDimensions;

	before(() => {
		helpers.setWindowSize();
		browser.url(hiviUapCtp.pageLink);
		helpers.waitForExpanded(adSlots.topLeaderboard);

		defaultDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.defaultDesktopRatio);

		helpers.slowScroll(500);

		scrollDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.resolvedDesktopRatio);

		helpers.reloadPageAndWaitForSlot(hiviUapCtp.pageLink, adSlots.topLeaderboard);
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);
		helpers.waitForExpanded(adSlots.topLeaderboard);

		refreshDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.resolvedDesktopRatio);

		helpers.reloadPageAndWaitForSlot(hiviUapCtp.pageLink, adSlots.topLeaderboard);
		helpers.switchToFrame(hiviUapCtp.topPlayerFrame);
		browser.waitForVisible(hiviUapCtp.videoContainer, timeouts.standard);
		browser.click(hiviUapCtp.videoContainer);
		hiviUapCtp.waitForVideoToFinish();
		browser.frame();
		helpers.waitForResolved(adSlots.topLeaderboard, adSlots.resolvedDesktopRatio);

		videoFinishedDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, adSlots.resolvedDesktopRatio);

		browser.frame();
	});

	beforeEach(() => {
		browser.url(hiviUapCtp.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.topLeaderboard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if default dimensions are correct', () => {
		expect(defaultDimensions.status, defaultDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after scroll are correct', () => {
		expect(scrollDimensions.status, scrollDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after refresh are correct', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after video finished playing are correct', () => {
		expect(videoFinishedDimensions.status, videoFinishedDimensions.capturedErrors)
			.to
			.be
			.true;
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

	it('Check if the line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(hiviUapCtp.firstCall, 'Line item ID mismatch');
	});

	it('Check if closing top leaderboard works properly', () => {
		browser.waitForVisible(hiviUapCtp.closeLeaderboardButton, timeouts.standard);
		browser.click(hiviUapCtp.closeLeaderboardButton);
		helpers.waitForCollapsed(adSlots.topLeaderboard);
	});
});

describe('Desktop HiVi UAP CTP ads page: video player in top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapCtp.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard);
		helpers.switchToFrame(hiviUapCtp.topPlayerFrame);
		browser.click(hiviUapCtp.videoContainer);
		helpers.waitToStartPlaying();
		browser.frame();
		browser.moveToObject(`${adSlots.topLeaderboard} ${hiviUapCtp.videoPlayer}`);
	});

	it('Check if opening the full screen player works properly', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUapCtp.playerFullscreenButton}`,
			timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUapCtp.playerFullscreenButton}`);
		browser.waitForVisible(hiviUapCtp.playerFullscreen, timeouts.standard);
	});

	it('Check if pausing the video works properly', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUapCtp.playPauseButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUapCtp.playPauseButton}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUapCtp.playPauseButton}${hiviUapCtp.buttonIsOnClass}`,
			timeouts.standard, true);
	});

	it('Check if unmuting the video works properly', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUapCtp.volumeButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUapCtp.volumeButton}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUapCtp.volumeButton}${hiviUapCtp.buttonIsOnClass}`,
			timeouts.standard, true);
	});

	it('Check if replaying the video works properly', () => {
		hiviUapCtp.waitForVideoToFinish();
		browser.waitForExist(`${hiviUapCtp.videoPlayer}${helpers.classHidden}`, timeouts.standard);
		helpers.switchToFrame(hiviUapCtp.topPlayerFrame);
		browser.waitForVisible(hiviUapCtp.replayOverlay, timeouts.standard);
		browser.click(hiviUapCtp.replayOverlay);
		browser.frame();
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUapCtp.videoPlayer}`, timeouts.standard);
	});
});

describe('Desktop HiVi UAP CTO ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapCtp.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad))
			.to
			.equal(hiviUapCtp.secondCall, 'Line item ID mismatch');
	});
});

describe('Desktop HiVi UAP CTP ads page: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapCtp.pageLink);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(hiviUapCtp.secondCall, 'Line item ID mismatch');
	});
});

describe('Desktop HiVi UAP CTP ads page: bottom leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let refreshDimensions;
	let videoFinishedDimensions;

	before(() => {
		helpers.reloadPageAndWaitForSlot(hiviUapCtp.pageLink, adSlots.topLeaderboard);
		helpers.slowScroll(7000);
		helpers.waitForExpanded(adSlots.bottomLeaderboard);

		defaultDimensions = helpers.checkDerivativeSizeSlotRatio(adSlots.bottomLeaderboard,
			helpers.wrapper,
			adSlots.defaultDesktopRatio);

		browser.refresh();
		helpers.slowScroll(7000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);

		refreshDimensions = helpers.checkDerivativeSizeSlotRatio(adSlots.bottomLeaderboard,
			helpers.wrapper,
			adSlots.resolvedDesktopRatio);

		helpers.reloadPageAndWaitForSlot(hiviUapCtp.pageLink, adSlots.topLeaderboard);
		helpers.slowScroll(7000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
		hiviUapCtp.waitForVideoToFinish();

		videoFinishedDimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard,
			adSlots.resolvedDesktopRatio);
	});

	beforeEach(() => {
		adStatus = helpers.getSlotStatus(adSlots.bottomLeaderboard);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if default dimensions are correct', () => {
		expect(defaultDimensions.status, defaultDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after refresh are correct', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after video finished are correct', () => {
		expect(videoFinishedDimensions.status, videoFinishedDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(hiviUapCtp.secondCall, 'Line item ID mismatch');
	});

	it('Check if redirect on click works properly', () => {
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Desktop HiVi UAP CTP ads page: video player in bottom leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapCtp.pageLink);
		helpers.slowScroll(7000);
		helpers.switchToFrame(hiviUapCtp.bottomPlayerFrame);
		browser.waitForVisible(hiviUapCtp.videoContainer, timeouts.standard);
		browser.click(hiviUapCtp.videoContainer);
		helpers.waitToStartPlaying();
		browser.frame();
		browser.moveToObject(`${adSlots.bottomLeaderboard} ${hiviUapCtp.videoPlayer}`);
	});

	it('Check if opening the fullscreen player works properly', () => {
		browser.waitForEnabled(hiviUapCtp.playerFullscreenButton, timeouts.standard);
		browser.click(hiviUapCtp.playerFullscreenButton);
		browser.waitForVisible(hiviUapCtp.playerFullscreen, timeouts.standard);
	});

	it('Check if pausing the video works properly', () => {
		browser.waitForEnabled(hiviUapCtp.playPauseButton, timeouts.standard);
		browser.click(hiviUapCtp.playPauseButton);
		browser.waitForExist(`${hiviUapCtp.playPauseButton}${hiviUapCtp.buttonIsOnClass}`,
			timeouts.standard, true);
	});

	it('Check if unmuting the video works properly', () => {
		browser.waitForEnabled(hiviUapCtp.volumeButton, timeouts.standard);
		browser.click(hiviUapCtp.volumeButton);
		browser.isExisting(`${hiviUapCtp.volumeButton}${hiviUapCtp.buttonIsOnClass}`,
			timeouts.standard, true);
	});

	it('Check if replaying the video works properly', () => {
		hiviUapCtp.waitForVideoToFinish();
		browser.waitForExist(`${adSlots.bottomLeaderboard} ${hiviUapCtp.videoPlayer}${helpers.classHidden}`, timeouts.standard);
		helpers.switchToFrame(hiviUapCtp.bottomPlayerFrame);
		browser.waitForVisible(hiviUapCtp.replayOverlay, timeouts.standard);
		browser.click(hiviUapCtp.replayOverlay);
		browser.frame();
		browser.waitForExist(`${adSlots.bottomLeaderboard} ${hiviUapCtp.videoPlayer}`, timeouts.standard);
	});
});
