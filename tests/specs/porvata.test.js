import porvata from '../pages/porvata.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Porvata player ads', () => {
	beforeEach(() => {
		browser.url(porvata.pageLink);
		browser.waitForVisible(porvata.porvataPlayer, timeouts.standard);
		browser.scroll(porvata.porvataPlayer);
		helpers.waitToStartPlaying();
	});

	it('Check player visibility', () => {
		const size = browser.getElementSize(porvata.porvataPlayer);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(porvata.playerWidth, 'Width incorrect');
			expect(size.height)
				.to
				.equal(porvata.playerHeight, 'height incorrect');
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

		expect(tableOfErrors.length, helpers.errorFormatter(tableOfErrors))
			.to
			.equal(0);
	});

	it('Check redirect on click', () => {
		browser.click(porvata.porvataPlayer);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.clickThroughUrlDomain);
		expect(browser.getUrl())
			.to
			.include(helpers.clickThroughUrlDomain);
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
		browser.waitForExist(porvata.stopScrolling, timeouts.standard);
	});

	it('Check closing the player', () => {
		browser.waitForVisible(porvata.closePlayerButton, timeouts.standard);
		browser.click(porvata.closePlayerButton);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});

	it('Check if replaying the video works', () => {
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.extended);
		browser.click(porvata.porvataPlayer);
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard, true);
	});

	it('Check if autoplay is disabled upon entering the page', () => {
		browser.url(helpers.addParametersToUrl(porvata.pageLink, [porvata.turnAutoplay(false)]));
		browser.waitForExist(porvata.videoPlayerHidden, timeouts.standard);
	});
});
