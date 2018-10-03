import hiviUap from '../pages/hivi-uap-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Hivi uap ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check line item id', () => {
		helpers.waitForLineItemParam(adSlots.topLeaderboard);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUap.topLineItemId, 'Line item ID mismatch');
	});

	it('will test if leaderboard does not obstruct the navbar', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		browser.waitForEnabled(adSlots.topLeaderboard, timeouts.standard);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});

	it('Check closing the top leaderboard', () => {
		browser.waitForEnabled(hiviUap.closeLeaderboardButton, timeouts.standard);
		browser.click(hiviUap.closeLeaderboardButton);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(hiviUap.slotResult))
			.to
			.equal(hiviUap.slotCollapsed, 'Slot has not collapsed');
	});

	it('Check top leaderboard unsticking after scroll', () => {
		helpers.slowScroll(3000);
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard in viewport')
			.to
			.be
			.false;
	});

	it('Check default and resolved state after scroll', () => {
		const tableOfErrors = [];

		helpers.reloadPage(hiviUap.pageLink, adSlots.topLeaderboard);
		browser.waitUntil(() => browser.getElementSize(adSlots.topLeaderboard, 'height') > 0, timeouts.standard, 'Element not expanded', 500);

		const defaultSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(defaultSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Default width incorrect');
			expect(defaultSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeight, 'Default height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		helpers.slowScroll(500);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);

		const resolvedSize = browser.getElementSize(adSlots.topLeaderboard, timeouts.standard);

		try {
			expect(resolvedSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Resolved width incorrect');
			expect(resolvedSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeightResolved, 'Resolved height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});


	it('Check default and resolved state after refresh', () => {
		const tableOfErrors = [];

		helpers.reloadPage(hiviUap.pageLink, adSlots.topLeaderboard);
		browser.waitUntil(() => browser.getElementSize(adSlots.topLeaderboard, 'height') > 0, timeouts.standard, 'Element not expanded', 500);

		const defaultSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(defaultSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Default width incorrect');
			expect(defaultSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeight, 'Default height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		helpers.refreshPage();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.waitUntil(() => browser.getElementSize(adSlots.topLeaderboard, 'height') > 0, timeouts.standard, 'Element not expanded', 500);

		const resolvedSize = browser.getElementSize(adSlots.topLeaderboard);

		try {
			expect(resolvedSize.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Resolved width incorrect');
			expect(resolvedSize.height)
				.to
				.equal(adSlots.uapTopLeaderboardHeightResolved, 'Resolved height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});
});

describe('Hivi uap ads page: video player in top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		helpers.waitToStartPlaying();
		browser.moveToObject(hiviUap.videoPlayer);
	});

	it('Check opening the full screen player', () => {
		browser.waitForEnabled(hiviUap.playerFullscreenButton, timeouts.standard);
		browser.click(hiviUap.playerFullscreenButton);
		expect(browser.isExisting(hiviUap.fullScreen), 'Top leaderboard not on full screen')
			.to
			.be
			.true;
	});

	it('Check pausing the video', () => {
		browser.waitForEnabled(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`, timeouts.standard);
		browser.click(`${adSlots.topLeaderboard} ${hiviUap.playPauseButton}`);
		expect(browser.isExisting(`${hiviUap.playPauseButton}${hiviUap.buttonIsOnClass}`), 'Video not paused')
			.to
			.be
			.false;
	});

	it('Check unmuting the video', () => {
		browser.waitForEnabled(hiviUap.volumeButton, timeouts.standard);
		browser.click(hiviUap.volumeButton);
		expect(browser.isExisting(`${hiviUap.volumeButton}${hiviUap.buttonIsOnClass}`), 'Video not unmuted')
			.to
			.be
			.false;
	});
});

describe('Hivi uap ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check line item id', () => {
		helpers.waitForLineItemParam(adSlots.topBoxad);
		expect(browser.element(adSlots.topBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUap.topLineItemId, 'Line item ID mismatch');
	});

	it('will test redirect on click', () => {
		browser.waitForEnabled(adSlots.topBoxad, timeouts.standard);
		browser.click(adSlots.topBoxad);
		helpers.waitForNewTab();

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

describe('Hivi uap ads page: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.incontentBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent boxad not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check line item id', () => {
		helpers.waitForLineItemParam(adSlots.topLeaderboard);
		expect(browser.element(adSlots.incontentBoxad).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUap.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		browser.waitForEnabled(adSlots.incontentBoxad, timeouts.standard);
		browser.click(adSlots.incontentBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

describe('Hivi uap ads page: bottom leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUap.pageLink);
		helpers.slowScroll(7000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.bottomLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.uapBottomLeaderboardWidth, ' Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.uapBottomLeaderboardHeight, 'Height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard), 'Bottom leaderboard not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check line item id', () => {
		helpers.waitForLineItemParam(adSlots.topLeaderboard);
		expect(browser.element(adSlots.bottomLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(hiviUap.bottomLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		browser.waitForEnabled(adSlots.bottomLeaderboard, timeouts.standard);
		browser.click(adSlots.bottomLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
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
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer} ${hiviUap.playerFullscreenButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.playerFullscreenButton}`);
		expect(browser.isExisting(hiviUap.fullScreen), 'Video not on full screen')
			.to
			.be
			.true;
	});

	it('Check pausing the video', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer} ${hiviUap.playPauseButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer} ${hiviUap.playPauseButton}`);
		expect(browser.isExisting(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer} ${hiviUap.playPauseButton}${hiviUap.buttonIsOnClass}`), 'Video not paused')
			.to
			.be
			.false;
	});

	it('Check unmuting the video', () => {
		browser.waitForEnabled(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer} ${hiviUap.volumeButton}`, timeouts.standard);
		browser.click(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer} ${hiviUap.volumeButton}`);
		expect(browser.isExisting(`${adSlots.bottomLeaderboard} ${hiviUap.videoPlayer} ${hiviUap.volumeButton}${hiviUap.buttonIsOnClass}`), 'Video not unmuted')
			.to
			.be
			.false;
	});
});
