import porvata from '../pages/porvata.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

// try to remove waitForVideoOverlay from beforeEach to execute tests faster (most of them need it now)

describe('It will test porvata player', () => {
	beforeEach(() => {
		browser.url(porvata.pageLink);
		browser.waitForVisible(porvata.porvataPlayer, timeouts.standard);
		browser.scroll(porvata.porvataPlayer);
		helpers.waitForVideoOverlay();
	});

	it('will test porvata player visibility', () => {
		const size = browser.getElementSize(porvata.porvataPlayer);

		expect(size.width)
			.to
			.equal(porvata.playerWidth, 'Width incorrect');
		expect(size.height)
			.to
			.equal(porvata.playerHeight, 'Height incorrect');
		expect(browser.isVisibleWithinViewport(porvata.porvataPlayer))
			.to
			.be
			.true;
	});

	it('will test redirect on click in porvata player', () => {
		browser.click(porvata.porvataPlayer);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test if clicking unmute button unmutes the video', () => {
		browser.waitForVisible(porvata.unmuteButton, timeouts.standard);
		browser.click(porvata.unmuteButton);

		const unmuted = browser.isExisting(`${porvata.unmuteButton}${porvata.iconHidden}`);

		expect(unmuted)
			.to
			.be
			.true;
	});

	it('will test opening full screen', () => {
		browser.waitForVisible(porvata.fullscreenButton, timeouts.standard);
		browser.click(porvata.fullscreenButton);

		const fullscreenOn = browser.isExisting(porvata.stopScrolling);

		expect(fullscreenOn)
			.to
			.be
			.true;
	});

	it('will test closing the player', () => {
		browser.waitForVisible(porvata.closePlayerButton, timeouts.standard);
		browser.click(porvata.closePlayerButton);

		const playerOff = browser.isExisting(porvata.videoPlayerHidden);

		expect(playerOff)
			.to
			.be
			.true;
	});

	it('will test if autoplay is disabled upon entering the page', () => {
		browser.url(helpers.addParametersToUrl(porvata.pageLink, [porvata.turnAutoplay(false)]));

		const playerOff = browser.isExisting(porvata.videoPlayerHidden);

		expect(playerOff)
			.to
			.be
			.true;
	});
});
