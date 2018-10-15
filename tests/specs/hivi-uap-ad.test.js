import hiviUap from '../pages/hivi-uap-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';
import hiviUapStatic from '../pages/hivi-uap-static-ad.page';

const { expect } = require('chai');

describe('HiVi UAP static ads page: top leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let scrollDimensions;
	let refreshDimensions;

	before(() => {
		browser.url(hiviUap.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);

		defaultDimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 4, 'Default');

		helpers.slowScroll(500);

		scrollDimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 10, 'Default');

		helpers.reloadPageAndWaitForSlot(hiviUap.pageLink, adSlots.topLeaderboard);
		helpers.refreshPageAndWaitForSlot(adSlots.topLeaderboard);

		refreshDimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 10, 'Default');
	});

	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is visible', () => {
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

	it('Check if closing top leaderboard works properly', () => {
		browser.click(hiviUapStatic.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(hiviUapStatic.slotCollapsed, 'Top leaderboard has not been closed');
	});
});

describe('HiVi UAP ads page: video player in top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		helpers.waitToStartPlaying();
		browser.moveToObject(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`);
	});

	it('Check if opening the full screen player works properly', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.playerFullscreenButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.playerFullscreenButton}`);
		browser.waitForExist(hiviUap.fullScreen, timeouts.standard);
	});

	it('Check if pausing the video works properly', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});

	it('Check if unmuting the video works properly', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});

	it('Check if replaying the video works properly', () => {
		browser.waitForExist(`${hiviUap.videoPlayer}${helpers.classHidden}`, timeouts.extended);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`, timeouts.standard);
	});
});

describe('HiVi UAP ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad))
			.to
			.equal(hiviUap.topLineItemId, 'Line item ID mismatch');
	});
});

describe('HiVi UAP ads page: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(hiviUap.bottomLineItemId, 'Line item ID mismatch');
	});
});

describe('HiVi UAP ads page: bottom leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(hiviUap.pageLink);
		helpers.slowScroll(7000);
		adStatus = helpers.checkSlotStatus(adSlots.bottomLeaderboard, timeouts.standard);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
	});

	it('Check if slot is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	// TODO fix; this leaderboard is not as wide as window, but as </body>
	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotRatio(adSlots.bottomLeaderboard, 10);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(hiviUap.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check if redirect on click works properly', () => {
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('HiVi UAP ads page: video player in bottom leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		helpers.slowScroll(7000);
		browser.waitForVisible(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer}`, timeouts.standard);
		helpers.waitToStartPlaying();
		browser.moveToObject(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer}`);
	});

	it('Check if opening the fullscreen player works', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.playerFullscreenButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.playerFullscreenButton}`);
		browser.waitForExist(hiviUap.fullScreen, timeouts.standard);
	});

	it('Check if pausing the video works properly', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.playPauseButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.playPauseButton}`);
		browser.waitForExist(`${adSlots.bottomLeaderboard} ${hiviUap.playPauseButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});

	it('Check if unmuting the video works properly', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.volumeButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.volumeButton}`);
		browser.isExisting(`${adSlots.bottomLeaderboard} ${hiviUap.volumeButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});
});
