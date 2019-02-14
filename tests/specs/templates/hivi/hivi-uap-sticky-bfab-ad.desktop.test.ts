import { expect } from 'chai';
import { hiviUapStickyBfab } from '../../../pages/hivi-uap-sticky-bfab-ad.page';
import { adSlots } from '../../../common/ad-slots';
import { timeouts } from '../../../common/timeouts';
import { helpers } from '../../../common/helpers';

describe('Desktop HiVi UAP sticky BFAB ads page: top leaderboard', () => {
	beforeEach(() => {
		browser.url(hiviUapStickyBfab.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	it('Check if the line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard)).to.equal(
			hiviUapStickyBfab.firstCall,
			'Line item ID mismatch',
		);
	});
});

describe('Desktop HiVi UAP sticky BFAB ads page: top boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapStickyBfab.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad)).to.equal(
			hiviUapStickyBfab.secondCall,
			'Line item ID mismatch',
		);
	});
});

describe('Desktop HiVi UAP sticky BFAB ads page: incontent boxad', () => {
	beforeEach(() => {
		browser.url(hiviUapStickyBfab.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard);
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad)).to.equal(
			hiviUapStickyBfab.secondCall,
			'Line item ID mismatch',
		);
	});
});

describe('Desktop HiVi UAP sticky BFAB ads page: bottom leaderboard', () => {
	let adStatus;
	let defaultDimensions;
	let refreshDimensions;
	let videoFinishedDimensions;

	before(() => {
		hiviUapStickyBfab.openUapWithState(false, hiviUapStickyBfab.pageLink, adSlots.topLeaderboard);
		browser.scroll(0, 3000);
		adSlots.waitForSlotExpanded(adSlots.bottomLeaderboard);

		defaultDimensions = adSlots.checkDerivativeSizeSlotRatio(
			adSlots.bottomLeaderboard,
			helpers.wrapper,
			adSlots.defaultDesktopRatio,
		);

		hiviUapStickyBfab.openUapWithState(true, hiviUapStickyBfab.pageLink, adSlots.topLeaderboard);
		browser.scroll(0, 3000);
		browser.waitForExist(adSlots.bottomLeaderboard, timeouts.standard);
		browser.scroll(adSlots.bottomLeaderboard);

		refreshDimensions = adSlots.checkDerivativeSizeSlotRatio(
			adSlots.bottomLeaderboard,
			helpers.wrapper,
			adSlots.resolvedDesktopRatio,
		);
		browser.url(hiviUapStickyBfab.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.scroll(0, 3000);
		browser.waitForExist(adSlots.bottomLeaderboard, timeouts.standard);
		browser.scroll(adSlots.bottomLeaderboard);
		helpers.waitForVideoAdToFinish(hiviUapStickyBfab.videoDuration);

		videoFinishedDimensions = adSlots.checkUAPSizeSlotRatio(
			adSlots.topLeaderboard,
			adSlots.resolvedDesktopRatio,
		);
	});

	beforeEach(() => {
		adStatus = adSlots.getSlotStatus(adSlots.bottomLeaderboard, true);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if default dimensions are correct', () => {
		expect(defaultDimensions.status, defaultDimensions.capturedErrors).to.be.true;
	});

	it('Check if resolved dimensions after refresh are correct', () => {
		expect(refreshDimensions.status, refreshDimensions.capturedErrors).to.be.true;
	});

	it('Check if resolved dimensions after video finished are correct', () => {
		expect(videoFinishedDimensions.status, videoFinishedDimensions.capturedErrors).to.be.true;
	});

	it('Check if line item id is from the same campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard)).to.equal(
			hiviUapStickyBfab.secondCall,
			'Line item ID mismatch',
		);
	});

	it('Check if redirect on click works properly', () => {
		browser.scroll(0, 1000);
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect').to.be.true;
	});

	it('Check if slot is sticked', () => {
		browser.refresh();
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		// TODO will not stick if scrolled earlier - problems with viewabillity counted?
		helpers.waitToStartPlaying();
		helpers.slowScroll(2500);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
		expect(browser.isVisibleWithinViewport(adSlots.bottomLeaderboard)).to.be.true;
		helpers.slowScroll(500, adSlots.bottomLeaderboard);
		expect(browser.isVisible(adSlots.bottomLeaderboard)).to.be.true;
	});
});
