import blockBtfAd from '../pages/block-btf-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Block BTF ads page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(blockBtfAd.pageLink, timeouts.standard);
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

describe('Block BTF ads page: incontent boxad', () => {
	let adStatus;

	before(() => {
		browser.url(blockBtfAd.pageLink, timeouts.standard);
		adStatus = helpers.checkSlotStatus(adSlots.incontentBoxad);
	});

	beforeEach(() => {
		helpers.slowScroll(2000);
	});

	it('Check if slot is hidden on the page', () => {
		expect(adStatus.inViewport, 'Visible in viewport')
			.to
			.be
			.false;
	});
});
