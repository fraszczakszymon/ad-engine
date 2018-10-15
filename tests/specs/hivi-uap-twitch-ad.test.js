import twitchAd from '../pages/hivi-uap-twitch-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Twitch ads page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(twitchAd.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotRatio(adSlots.topLeaderboard, 3.88);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check line item id', () => {
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

	it('Check redirect on click', () => {
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
		browser.waitForVisible(adSlots.topLeaderboard);
	});

	it('Check Twitch player visibility', () => {
		const myFrame = $(twitchAd.playerFrame).value;

		browser.frame(myFrame);
		browser.waitForVisible(twitchAd.twitchPlayer, timeouts.standard);
	});
});
