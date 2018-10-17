import twitchAd from '../pages/hivi-uap-twitch-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Twitch ads page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(twitchAd.pageLink);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);
	});

	it('Check if slot is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkUAPSizeSlotRatio(adSlots.topLeaderboard, 3.88);

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

	it('Check if leaderboard does not obstruct the navbar', () => {
		expect(browser.isVisibleWithinViewport(helpers.navbar), 'Navbar not visible')
			.to
			.be
			.true;
	});

	it('Check if redirect on click works properly', () => {
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

	// TODO fix assertion
	it('Check if playing the stream works properly', () => {
		const twitchFrame = browser.element(twitchAd.twitchFrame).value;

		browser.frame(twitchFrame);
		browser.click(twitchAd.playPauseButton);
		expect(browser.element(twitchAd.playerClass).getAttribute(twitchAd.buttonPressedAttribute))
			.to
			.include(twitchAd.playPauseButton, 'Stream not playing');
	});

	// TODO fix assertion
	it('Check if unmuting the stream works properly', () => {
		const twitchFrame = browser.element(twitchAd.twitchFrame).value;

		browser.frame(twitchFrame);
		browser.click(twitchAd.unmuteButton);
		expect(browser.element(twitchAd.playerClass).getAttribute(twitchAd.buttonPressedAttribute))
			.to
			.include(twitchAd.unmuteButton, 'Stream not unmuted');
	});
});
