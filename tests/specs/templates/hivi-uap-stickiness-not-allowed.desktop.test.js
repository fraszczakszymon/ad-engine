import { expect } from 'chai';
import { hiviUapStickinessNotAllowed } from '../../pages/hivi-uap-stickiness-not-allowed.page';
import { adSlots } from '../../common/ad-slots';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';

describe('Desktop HiVi UAP sticky ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapStickinessNotAllowed.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check if the line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(hiviUapStickinessNotAllowed.firstCall, 'Line item ID mismatch');
	});
});

describe('Desktop HiVi UAP sticky ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapStickinessNotAllowed.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad))
			.to
			.equal(hiviUapStickinessNotAllowed.secondCall, 'Line item ID mismatch');
	});
});

describe('Desktop HiVi UAP sticky ads page: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapStickinessNotAllowed.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(hiviUapStickinessNotAllowed.secondCall, 'Line item ID mismatch');
	});
});

describe('Desktop HiVi UAP sticky ads page: bottom leaderboard', () => {
	let adStatus;
	let refreshDimensions;
	let videoFinishedDimensions;

	before(() => {
		hiviUapStickinessNotAllowed.openUapWithState(true, hiviUapStickinessNotAllowed.pageLink, adSlots.topLeaderboard);
		browser.scroll(0, 3000);
		browser.waitForExist(adSlots.bottomLeaderboard, timeouts.standard);
		browser.scroll(adSlots.bottomLeaderboard);

		refreshDimensions = adSlots.checkDerivativeSizeSlotRatio(adSlots.bottomLeaderboard,
			helpers.wrapper,
			adSlots.resolvedDesktopRatio);
		browser.url(hiviUapStickinessNotAllowed.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.scroll(0, 3000);
		browser.waitForExist(adSlots.bottomLeaderboard, timeouts.standard);
		browser.scroll(adSlots.bottomLeaderboard);
		helpers.waitForVideoAdToFinish(hiviUapStickinessNotAllowed.videoLength);

		videoFinishedDimensions = adSlots.checkUAPSizeSlotRatio(adSlots.topLeaderboard,
			adSlots.resolvedDesktopRatio);
	});

	beforeEach(() => {
		adStatus = adSlots.getSlotStatus(adSlots.bottomLeaderboard, true);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after refresh are correct', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if resolved dimensions after video finished are correct', () => {
		expect(videoFinishedDimensions.status, videoFinishedDimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(hiviUapStickinessNotAllowed.secondCall, 'Line item ID mismatch');
	});

	it('Check if redirect on click works properly', () => {
		browser.scroll(0, 1000);
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check if slot is sticked', () => {
		browser.refresh();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.waitToStartPlaying();
		helpers.slowScroll(2500);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
		expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard))
			.to
			.be
			.false;
		helpers.slowScroll(500, adSlots.bottomLeaderboard);
		expect(browser.isVisible(adSlots.bottomLeaderboard))
			.to
			.be
			.true;
	});
});
