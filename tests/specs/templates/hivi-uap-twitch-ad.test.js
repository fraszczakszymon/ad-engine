import twitchAd from '../../pages/hivi-uap-twitch-ad.page';
import adSlots from '../../common/adSlots';
import { timeouts } from '../../common/timeouts';
import helpers from '../../common/helpers';

const { expect } = require('chai');

describe('Twitch ads page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(twitchAd.pageLink);
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
		const dimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, twitchAd.twitchLeaderboardRatio);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the correct campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(twitchAd.topLeaderboardLineItemId, 'Line item ID mismatch');
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

describe('Twitch ads page: player', () => {
	before(() => {
		browser.url(twitchAd.pageLink);
	});

	beforeEach(() => {
		browser.waitForVisible(twitchAd.twitchPlayer);
	});

	afterEach(() => {
		browser.frame();
	});

	it('Check if Twitch player is visible', () => {
		expect(browser.isVisibleWithinViewport(twitchAd.twitchPlayer), 'Player not visible')
			.to
			.be
			.true;
	});

	it('Check if playing the stream works', () => {
		helpers.switchToFrame(twitchAd.twitchFrame);
		browser.click(twitchAd.playPauseButton);
		expect(browser.element(twitchAd.playerClass).getAttribute(twitchAd.buttonPressedAttribute))
			.to
			.include(twitchAd.playPauseButton.substring(1), 'Stream not playing');
	});

	it('Check if unmuting the stream works', () => {
		helpers.switchToFrame(twitchAd.twitchFrame);
		browser.click(twitchAd.unmuteButton);
		expect(browser.element(twitchAd.playerClass).getAttribute(twitchAd.buttonPressedAttribute))
			.to
			.include(twitchAd.unmuteButton.substring(1), 'Stream not unmuted');
	});

	it('Check if clicking on Twitch button redirects to Twitch account with that stream', () => {
		helpers.switchToFrame(twitchAd.twitchFrame);
		browser.click(twitchAd.twitchButton);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(twitchAd.twitchWord);
		expect(browser.getUrl())
			.to
			.include(twitchAd.twitchWord, `Wrong page loaded: expected ${twitchAd.twitchWord}`);
		helpers.closeNewTabs();
	});
});
