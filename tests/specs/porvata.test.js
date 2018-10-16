import porvata from '../pages/porvata.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Porvata player', () => {
	let adStatus;

	before(() => {
		browser.url(porvata.pageLink);
		browser.scroll(porvata.porvataPlayer);
	});

	beforeEach(() => {
		browser.waitForVisible(porvata.porvataPlayer, timeouts.standard);
		adStatus = helpers.checkSlotStatus(porvata.porvataPlayer);
		helpers.waitToStartPlaying();
	});

	it('Check if player is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotSize(porvata.porvataPlayer, porvata.playerWidth, porvata.playerHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if redirect on click on default player works properly', () => {
		browser.click(porvata.porvataPlayer);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain, `Wrong page loaded: expected ${helpers.clickThroughUrlDomain}`);
		helpers.closeNewTabs();
	});

	it('Check if unmuting the video works properly', () => {
		browser.waitForVisible(porvata.unmuteButton, timeouts.standard);
		browser.click(porvata.unmuteButton);
		browser.waitForExist(`${porvata.unmuteButton}${porvata.iconHidden}`, timeouts.standard);
	});

	it('Check if opening full screen and redirect on fullscreen player works properly', () => {
		browser.waitForVisible(porvata.fullscreenButton, timeouts.standard);
		browser.click(porvata.fullscreenButton);
		browser.waitForVisible(porvata.fullscreenPlayer, timeouts.standard);
		browser.click(porvata.porvataPlayer);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain, `Wrong page loaded: expected ${helpers.clickThroughUrlDomain}`);
		helpers.closeNewTabs();
	});

	it('Check if replaying the video works properly', () => {
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.extended);
		browser.click(porvata.porvataPlayer);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard, true);
	});

	it('Check if closing the player works properly', () => {
		browser.waitForVisible(porvata.closePlayerButton, timeouts.standard);
		browser.click(porvata.closePlayerButton);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});

	it('Check if autoplay is disabled upon entering the page', () => {
		browser.url(helpers.addParametersToUrl(porvata.pageLink, [porvata.turnAutoplay(false)]));
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});
});
