import commonAds from '../pages/common-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Common slots: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(commonAds.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.topLeaderboard);
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topLeaderboard, adSlots.leaderboardWidth, adSlots.leaderboardHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if line item id is from the inhouse campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topLeaderboard);
		expect(helpers.getLineItemId(adSlots.topLeaderboard))
			.to
			.equal(adSlots.inhouseLineItemId, 'Line item ID mismatch');
	});

	it('Check if redirect on click works properly', () => {
		expect(helpers.adRedirect(adSlots.topLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Common slots: top boxad', () => {
	let adStatus;

	before(() => {
		browser.url(commonAds.pageLink);
		browser.waitForVisible(adSlots.topBoxad, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.topBoxad);
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topBoxad, adSlots.boxadWidth, adSlots.boxadHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if line item id is from the inhouse campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.topBoxad);
		expect(helpers.getLineItemId(adSlots.topBoxad))
			.to
			.equal(adSlots.inhouseLineItemId, 'Line item ID mismatch');
	});

	it('Check if redirect on click works', () => {
		expect(helpers.adRedirect(adSlots.topBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Common slots: rail module', () => {
	let adStatus;

	before(() => {
		browser.url(commonAds.pageLink);
		browser.scroll(0, 250);
		browser.waitForVisible(adSlots.railModule, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.railModule);
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotSize(adSlots.railModule, adSlots.railModuleWidth, adSlots.railModuleHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if module is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});
});

describe('Common slots: incontent boxad', () => {
	let adStatus;

	before(() => {
		browser.url(commonAds.pageLink);
		browser.scroll(0, 500);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.incontentBoxad);
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotSize(adSlots.incontentBoxad, adSlots.boxadWidth, adSlots.boxadHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if line item id is from the inhouse campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.incontentBoxad);
		expect(helpers.getLineItemId(adSlots.incontentBoxad))
			.to
			.equal(adSlots.inhouseLineItemId, 'Line item ID mismatch');
	});

	it('Check if redirect on click works properly', () => {
		expect(helpers.adRedirect(adSlots.incontentBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

describe('Common slots: bottom leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(commonAds.pageLink);
		browser.scroll(0, 6000);
		browser.waitForVisible(adSlots.bottomLeaderboard, timeouts.standard);
	});

	it('Check if dimensions are correct', () => {
		const dimensions = helpers.checkSlotSize(adSlots.bottomLeaderboard, adSlots.leaderboardWidth, adSlots.leaderboardHeight);

		adStatus = helpers.getSlotStatus(adSlots.bottomLeaderboard);
		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check if slot is visible in viewport', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if line item id is from the inhouse campaign', () => {
		helpers.waitForLineItemIdAttribute(adSlots.bottomLeaderboard);
		expect(helpers.getLineItemId(adSlots.bottomLeaderboard))
			.to
			.equal(adSlots.inhouseLineItemId, 'Line item ID mismatch');
	});

	it('Check if redirect on click works properly', () => {
		expect(helpers.adRedirect(adSlots.bottomLeaderboard), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});

