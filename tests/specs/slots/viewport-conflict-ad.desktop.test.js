import { expect } from 'chai';
import { viewportConflictAd } from '../../pages/viewport-conflict-ad.page';
import { adSlots } from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';

describe('Viewport conflict ads page: top boxad', () => {
	before(() => {
		browser.url(viewportConflictAd.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check if top boxad is hidden after clicking the button', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		adSlots.waitForSlotResult(adSlots.topBoxad, adSlots.adCollapsed);
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

	it('Check if slot is visible in viewport', () => {
		browser.waitForVisible(viewportConflictAd.hideBoxadButton, timeouts.standard);
		browser.waitForVisible(viewportConflictAd.addParagraphButton, timeouts.standard);
		browser.click(viewportConflictAd.hideBoxadButton);
		viewportConflictAd.addParagraphs(5);
		browser.scroll(0, 2800);
		adSlots.waitForSlotResult(adSlots.bottomLeaderboard, adSlots.adLoaded);
		expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard))
			.to
			.be
			.true;
	});
});
