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

	xit('will test porvata player visibility', () => {
		const size = browser.getElementSize(porvata.porvataPlayer);

		expect(size.width)
			.to
			.equal(300, 'Width incorrect');
		expect(size.height)
			.to
			.equal(250, 'Height incorrect');
		expect(browser.isVisibleWithinViewport(porvata.porvataPlayer))
			.to
			.be
			.true;
	});

	// links in this test will be changed after it is fixed on the page

	xit('will test redirection to news and stories after clicking on a video in the porvata player', () => {
		browser.click(porvata.porvataPlayer);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl('http://fandom.wikia.com/');
		expect(browser.getUrl())
			.to
			.equal('http://fandom.wikia.com/');
	});

	xit('will test if clicking unmute button unmutes the video', () => {
		browser.waitForVisible(porvata.unmuteButton, timeouts.standard);
		browser.click(porvata.unmuteButton);

		const unmuted = browser.isExisting(`${porvata.unmuteButton}${porvata.iconHidden}`);

		expect(unmuted)
			.to
			.be
			.true;
	});

	xit('will test if clicking fullscreen button sets the video on full screen', () => {
		browser.waitForVisible(porvata.fullscreenButton, timeouts.standard);
		browser.click(porvata.fullscreenButton);

		const fullscreenOn = browser.isExisting(porvata.stopScrolling);

		expect(fullscreenOn).to.be.true;
	});

	xit('will test if clicking close button stops the player', () => {
		browser.waitForVisible(porvata.closePlayerButton, timeouts.standard);
		browser.click(porvata.closePlayerButton);

		const playerOff = browser.isExisting(porvata.videoPlayerHidden);

		expect(playerOff).to.be.true;
	});

	xit('will test if autoplay is disabled upon entering the page', () => {
		browser.url(`${porvata.pageLink}${porvata.turnAutoplay(false)}`);

		const playerOff = browser.isExisting(porvata.videoPlayerHidden);

		expect(playerOff).to.be.true;
	});
});
