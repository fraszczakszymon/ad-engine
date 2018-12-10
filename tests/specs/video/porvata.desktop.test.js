import { expect } from 'chai';
import { porvata } from '../../pages/porvata.page';
import { timeouts } from '../../common/timeouts';
import { adSlots } from '../../common/ad-slots';
import { helpers } from '../../common/helpers';
import { queryStrings } from '../../common/query-strings';

describe('Porvata player', () => {
	let adStatus;

	before(() => {
		browser.url(porvata.pageLink);
		browser.waitForVisible(porvata.player, timeouts.standard);
		browser.scroll(porvata.player);
	});

	beforeEach(() => {
		browser.waitForVisible(porvata.player, timeouts.standard);
		adStatus = adSlots.getSlotStatus(porvata.player);
		helpers.waitToStartPlaying();
	});

	it('Check if player is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if dimensions are correct', () => {
		const dimensions = adSlots.checkSlotSize(
			porvata.player,
			porvata.playerWidth,
			porvata.playerHeight,
		);

		expect(dimensions.status, dimensions.capturedErrors).to.be.true;
	});

	it('Check if redirect on click on default player works', () => {
		browser.click(porvata.player);
		helpers.switchToTab(1);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl()).to.include(
			helpers.clickThroughUrlDomain,
			`Wrong page loaded: expected ${helpers.clickThroughUrlDomain}`,
		);
		helpers.closeNewTabs();
	});

	it('Check if unmuting the video works', () => {
		browser.waitForVisible(porvata.unmuteButton, timeouts.standard);
		browser.click(porvata.unmuteButton);
		browser.waitForExist(`${porvata.unmuteButton}${porvata.iconHidden}`, timeouts.standard);
	});

	it('Check if opening full screen and redirect on fullscreen player works', () => {
		browser.waitForVisible(porvata.fullscreenButton, timeouts.standard);
		browser.click(porvata.fullscreenButton);
		browser.waitForVisible(porvata.fullscreenPlayer, timeouts.standard);
		browser.click(porvata.player);
		helpers.switchToTab(1);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl()).to.include(
			helpers.clickThroughUrlDomain,
			`Wrong page loaded: expected ${helpers.clickThroughUrlDomain}`,
		);
		helpers.closeNewTabs();
	});

	it('Check if replaying the video works', () => {
		helpers.waitForVideoAdToFinish(porvata.videoDuration);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
		browser.click(porvata.player);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard, true);
	});

	it('Check if closing the player works', () => {
		browser.waitForVisible(porvata.closePlayerButton, timeouts.standard);
		browser.click(porvata.closePlayerButton);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});

	it('Check if autoplay is disabled upon entering the page', () => {
		helpers.navigateToUrl(porvata.pageLink, queryStrings.getAutoplay(false));
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});
});
