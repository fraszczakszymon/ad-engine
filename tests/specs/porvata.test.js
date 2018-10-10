import porvata from '../pages/porvata.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Porvata player ads', () => {
	let adStatus;

	before(() => {
		browser.url(porvata.pageLink);
		adStatus = helpers.checkSlotStatus(porvata.porvataPlayer);
	});

	beforeEach(() => {
		browser.waitForVisible(porvata.porvataPlayer, timeouts.standard);
		browser.scroll(porvata.porvataPlayer);
		helpers.waitToStartPlaying();
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(porvata.porvataPlayer, porvata.playerWidth, porvata.playerHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(porvata.porvataPlayer), 'Wrong link after redirect')
			.to
			.be
			.true;
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
