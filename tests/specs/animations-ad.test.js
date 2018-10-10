import animationsAd from '../pages/animations-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Animations ad page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(animationsAd.pageLink);
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

	it('Check top leaderboard disappearing after 6 seconds', () => {
		browser.waitUntil(() => browser.element(adSlots.topLeaderboard).getAttribute(animationsAd.topLeaderboardStyle) === animationsAd.collapsedAdMaxHeight, animationsAd.waitForAnimationsTime, 'Top leaderboard ad did not collapse', timeouts.interval);
		animationsAd.waitToScroll();

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);

		expect(topLeaderboardSize.height)
			.to
			.equal(animationsAd.topLeaderboardHeightWhenHidden, 'Top leaderboard was not hidden');
	});
});

describe('Animations ads page: top boxad', () => {
	let adStatus;

	before(() => {
		browser.url(animationsAd.pageLink);
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
});

