import porvata from '../pages/porvata.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Porvata player', () => {
	let adStatus;

	before(() => {
		browser.url(porvata.pageLink);
		browser.scroll(porvata.porvataPlayer);
		adStatus = helpers.checkSlotStatus(porvata.porvataPlayer);
	});

	beforeEach(() => {
		browser.waitForVisible(porvata.porvataPlayer, timeouts.standard);
		helpers.waitToStartPlaying();
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(porvata.porvataPlayer, porvata.playerWidth, porvata.playerHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		browser.click(porvata.porvataPlayer);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain, `Wrong page loaded: expected ${helpers.clickThroughUrlDomain}`);
		helpers.closeNewTabs();
	});

	it('Check unmuting the video', () => {
		browser.waitForVisible(porvata.unmuteButton, timeouts.standard);
		browser.click(porvata.unmuteButton);
		browser.waitForExist(`${porvata.unmuteButton}${porvata.iconHidden}`, timeouts.standard);
	});

	it('Check opening full screen', () => {
		browser.waitForVisible(porvata.fullscreenButton, timeouts.standard);
		browser.click(porvata.fullscreenButton);
		browser.waitForVisible(porvata.fullscreenPlayer, timeouts.standard);
		browser.keys(['Escape', 'Escape']); // TODO fix buttons not working
		browser.waitForVisible(porvata.fullscreenPlayer, timeouts.standard, true);
	});

	it('Check if replaying the video works', () => {
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.extended);
		browser.click(porvata.porvataPlayer);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard, true);
	});

	it('Check closing the player', () => {
		browser.waitForVisible(porvata.closePlayerButton, timeouts.standard);
		browser.click(porvata.closePlayerButton);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});

	it('Check if autoplay is disabled upon entering the page', () => {
		browser.url(helpers.addParametersToUrl(porvata.pageLink, [porvata.turnAutoplay(false)]));
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});
});
