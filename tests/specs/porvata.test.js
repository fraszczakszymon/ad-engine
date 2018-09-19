import porvata from '../pages/porvata.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test porvata player', () => {
	beforeEach(() => {
		browser.url(porvata.pageLink);
		browser.waitForVisible(porvata.porvataPlayer, timeouts.standard);
		browser.scroll(porvata.porvataPlayer);
		porvata.waitForVideoOverlay();
	});

	it('will test porvata player visibility', () => {
		const size = browser.getElementSize(porvata.porvataPlayer);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(porvata.playerWidth, 'Porvata width incorrect');
			expect(size.height)
				.to
				.equal(porvata.playerHeight, 'Porvata height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(porvata.porvataPlayer), 'Player not visible')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
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
		expect(browser.isExisting(`${porvata.unmuteButton}${porvata.iconHidden}`))
			.to
			.be
			.true;
	});

	it('will test opening full screen', () => {
		browser.waitForVisible(porvata.fullscreenButton, timeouts.standard);
		browser.click(porvata.fullscreenButton);
		expect(browser.isExisting(porvata.stopScrolling))
			.to
			.be
			.true;
	});

	it('will test closing the player', () => {
		browser.waitForVisible(porvata.closePlayerButton, timeouts.standard);
		browser.click(porvata.closePlayerButton);
		expect(browser.isExisting(porvata.videoPlayerHidden))
			.to
			.be
			.true;
	});

	it('will test if autoplay is disabled upon entering the page', () => {
		browser.url(helpers.addParametersToUrl(porvata.pageLink, [porvata.turnAutoplay(false)]));
		expect(browser.isExisting(porvata.videoPlayerHidden))
			.to
			.be
			.true;
	});
});
