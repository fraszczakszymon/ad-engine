import animationsAd from '../pages/animations-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';

const { expect } = require('chai');

describe('Animations ad page: top leaderboard', () => {

	before(() => {
		browser.url(animationsAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
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

