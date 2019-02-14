import { expect } from 'chai';
import { animationsAd } from '../../pages/animations-ad.page';
import { adSlots } from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';

describe('Animations ad page: top leaderboard', () => {
	before(() => {
		browser.url(animationsAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check if top leaderboard disappears after 6 seconds', () => {
		animationsAd.waitUntilCollapsed();
		animationsAd.waitToScroll();

		const topLeaderboardSize = browser.getElementSize(adSlots.topLeaderboard);

		expect(topLeaderboardSize.height).to.equal(
			animationsAd.topLeaderboardHeightWhenHidden,
			'Top leaderboard was not hidden',
		);
	});
});
