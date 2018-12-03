import { expect } from 'chai';
import { jwPlayer } from '../../pages/jwplayer.page';
import { timeouts } from '../../common/timeouts';
import { adSlots } from '../../common/ad-slots';
import { helpers } from '../../common/helpers';
import { queryStrings } from '../../common/query-strings';

describe('jwPlayer player', () => {
	let adStatus;

	before(() => {
		browser.url(jwPlayer.pageLink);
		browser.waitForVisible(jwPlayer.player, timeouts.standard);
		adStatus = adSlots.getSlotStatus(jwPlayer.player);
	});

	beforeEach(() => {
		browser.url(jwPlayer.pageLink);
		browser.waitForVisible(jwPlayer.player, timeouts.standard);
		helpers.waitToStartPlaying();
	});

	it('Check if player is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if dimensions are correct', () => {
		const dimensions = adSlots.checkSlotSize(jwPlayer.player, jwPlayer.playerWidth, jwPlayer.playerHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if redirect on click on default player works', () => {
		browser.click(jwPlayer.player);
		helpers.switchToTab(1);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain, `Wrong page loaded: expected ${helpers.clickThroughUrlDomain}`);
		helpers.closeNewTabs();
	});

	it('Check if unmuting the video works', () => {
		browser.moveToObject(jwPlayer.player).pause(500);
		browser.waitForVisible(jwPlayer.soundToggle, timeouts.standard);
		browser.click(jwPlayer.soundToggle);
		browser.waitForExist(`${jwPlayer.soundToggle}${jwPlayer.soundToggleOn}`, timeouts.standard);
		expect(jwPlayer.isAudioOn()).to.be.true;
	});

	it('Check if opening full screen and redirect on fullscreen player works', () => {
		browser.moveToObject(jwPlayer.player).pause(500);
		browser.waitForVisible(jwPlayer.fullscreenButton, timeouts.standard);
		browser.click(jwPlayer.fullscreenButton);
		browser.waitForVisible(jwPlayer.fullscreenPlayer, timeouts.standard);
		browser.click(jwPlayer.player);
		helpers.switchToTab(1);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain, `Wrong page loaded: expected ${helpers.clickThroughUrlDomain}`);
		helpers.closeNewTabs();
	});

	it('Check if preroll the video works', () => {
		browser.waitForExist(jwPlayer.player, timeouts.standard);
		expect(jwPlayer.isAdVisible()).to.be.true;
	});

	it('Check if midroll the video works', () => {
		helpers.navigateToUrl(jwPlayer.pageLink, queryStrings.getMidroll(true));
		browser.waitForExist(jwPlayer.player, timeouts.standard);
		jwPlayer.waitForAdToChangeState(true);
		helpers.waitForVideoAdToFinish(30000);
		jwPlayer.waitForAdToChangeState(false);
		helpers.waitForVideoAdToFinish(40000);
		jwPlayer.waitForAdToChangeState(true);
	});

	it('Check if autoplay is disabled upon entering the page', () => {
		helpers.navigateToUrl(jwPlayer.pageLink, queryStrings.getAutoplay(false));
		browser.waitForVisible(jwPlayer.player, timeouts.standard);
		expect(browser.isExisting(jwPlayer.videoIdle)).to.be.false;
	});
});
