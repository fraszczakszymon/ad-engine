import hiviUap from '../pages/hivi-uap-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';
import hiviUapStatic from '../pages/hivi-uap-static-ad.page';

const { expect } = require('chai');

describe('Hivi uap static ads page: top leaderboard', () => {
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

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check default dimensions', () => {
		expect(defaultDimensions.status, defaultDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check resolved dimensions after scroll', () => {
		expect(scrollDimensions.status, scrollDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check resolved dimensions after refresh', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check closing top leaderboard', () => {
		browser.click(hiviUapStatic.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.resultAttribute))
			.to
			.equal(hiviUapStatic.slotCollapsed, 'Top leaderboard has not been closed');
	});
});

describe('Hivi uap ads page: video player in top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		helpers.waitToStartPlaying();
		browser.moveToObject(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`);
	});

	it('Check opening the full screen player', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.playerFullscreenButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.playerFullscreenButton}`);
		browser.waitForExist(hiviUap.fullScreen, timeouts.standard);
	});

	it('Check pausing the video', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});

	it('Check unmuting the video', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUap.volumeButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});

	it('Check replaying the video', () => {
		browser.waitForExist(`${hiviUap.videoPlayer}${helpers.classHidden}`, timeouts.extended);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`);
		browser.waitForExist(`${adSlots.topLeaderboard} ${hiviUap.videoPlayer}`, timeouts.standard);
	});
});

describe('Hivi uap ads page: top boxad', () => {
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

describe('Hivi uap ads page: incontent boxad', () => {
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

describe('Hivi uap ads page: bottom leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(hiviUap.pageLink);
		helpers.slowScroll(7000);
		adStatus = helpers.checkSlotStatus(adSlots.bottomLeaderboard, timeouts.standard);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	// TODO fix; this leaderboard is not as wide as window, but as </body>
	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotRatio(adSlots.bottomLeaderboard, 10);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check line item id', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(hiviUap.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Hivi uap ads page: video player in bottom leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		helpers.slowScroll(7000);
		browser.waitForVisible(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer}`, timeouts.standard);
		helpers.waitToStartPlaying();
		browser.moveToObject(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer}`);
	});

	it('Check opening the fullscreen player', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.playerFullscreenButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.playerFullscreenButton}`);
		browser.waitForExist(hiviUap.fullScreen, timeouts.standard);
	});

	it('Check pausing the video', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.playPauseButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.playPauseButton}`);
		browser.waitForExist(`${adSlots.bottomLeaderboard} ${hiviUap.playPauseButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});

	it('Check unmuting the video', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.volumeButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.volumeButton}`);
		browser.isExisting(`${adSlots.bottomLeaderboard} ${hiviUap.volumeButton}${hiviUap.buttonIsOnClass}`, timeouts.standard, true);
	});
});
