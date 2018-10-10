import viewportConflictAd from '../pages/viewport-conflict-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Viewport conflicts ads: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(viewportConflictAd.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.leaderboardWidth, adSlots.leaderboardHeight);

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
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Viewport conflict ads page: top boxad', () => {
	let adStatus;

	before(() => {
		browser.url(viewportConflictAd.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topBoxad);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topBoxad, adSlots.boxadWidth, adSlots.boxadHeight);

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
		expect(helpers.adRedirect(adSlots.topBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check if top boxad is hidden after clicking the button', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		helpers.waitForResult(adSlots.topBoxad, adSlots.adCollapsed);
		expect(browser.isExisting(`${adSlots.topBoxad}${helpers.classHidden}`))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.false;
	});
});

describe('Viewport conflict ads page: bottom leaderboard', () => {
	beforeEach(() => {
		browser.url(viewportConflictAd.pageLink);
	});

	it('Check visibility', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.waitForVisible(viewportConflictAd.addParagraphButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		viewportConflictAd.addParagraphs(5);
		browser.scroll(0, 2800);
		helpers.waitForResult(adSlots.bottomLeaderboard, adSlots.adLoaded);
		expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard))
			.to
			.be
			.true;
	});
});
