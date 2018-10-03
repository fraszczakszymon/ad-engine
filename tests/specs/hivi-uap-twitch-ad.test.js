import twitchAd from '../pages/hivi-uap-twitch-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

xdescribe('Twitch ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(twitchAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.topLeaderboard);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.adProductsTopLeaderboardWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.twitchLeaderboardHeight, 'Height incorrect');
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

	it('Check line item id', () => {
		helpers.waitForLineItemParam(adSlots.topLeaderboard);
		expect(browser.element(adSlots.topLeaderboard).getAttribute(adSlots.lineItemParam))
			.to
			.equal(twitchAd.topLeaderboardLineItemId, 'Line item ID mismatch');
	});

	it('Check if leaderboard does not obstruct the navbar', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		helpers.waitForLineItemParam(adSlots.topBoxad);
		browser.click(adSlots.topLeaderboard);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});

describe('Twitch ads page: twitch player', () => {
	beforeEach(() => {
		browser.url(twitchAd.pageLink);
		browser.frame(twitchAd.playerFrame);
		browser.waitForVisible(twitchAd.twitchPlayer, timeouts.standard);
		helpers.waitToStartPlaying();
	});

	it('Check unmuting the stream', () => {
		browser.moveToObject(`${twitchAd.twitchPlayer}`);
		browser.click(twitchAd.unmuteButton);
		expect(browser.isExisting(`${twitchAd.unmuteButton}${adSlots.buttonIsOnClass}`), 'Stream not unmuted')
			.to
			.be
			.false;
	});

	xit('will test opening fullscreen player', () => {
		browser.moveToObject(`${adSlots.topLeaderboard} ${twitchAd.twitchPlayer}`);
		browser.click(twitchAd.fullscreenButton);
	});

	xit('will test playing the stream', () => {

	});
});

xdescribe('Twitch ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(twitchAd.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check dimensions and visibility', () => {
		const size = browser.getElementSize(adSlots.topBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Top boxad width incorrect');
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, 'Top boxad height incorrect');
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
			.equal(twitchAd.topBoxadLineItemId, 'Line item ID mismatch');
	});

	it('Check redirect on click', () => {
		helpers.waitForLineItemParam(adSlots.topBoxad);
		browser.click(adSlots.topBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.fandomWord);
		expect(browser.getUrl())
			.to
			.include(helpers.fandomWord);
		helpers.closeNewTabs();
	});
});
