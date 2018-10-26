import stickyAd from '../../pages/sticky-ad.page';
import adSlots from '../../common/adSlots';
import { timeouts } from '../../common/timeouts';
import helpers from '../../common/helpers';

const { expect } = require('chai');

describe('sticky-ad template', () => {
	beforeEach(() => {
		browser.url(stickyAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('should stick and unstick', () => {
		expect(browser.isExisting(stickyAd.stickedSlot), 'Top leaderboard is sticked too soon')
			.to
			.be
			.false;

		helpers.slowScroll(500);

		expect(browser.isExisting(stickyAd.stickedSlot), 'Top leaderboard is not sticked')
			.to
			.be
			.true;

		browser.pause(stickyAd.unstickTime);
		helpers.slowScroll(1000);

		expect(browser.isExisting(stickyAd.stickedSlot), 'Top leaderboard is not unsticked properly')
			.to
			.be
			.false;
	});

	it('should not stick if viewability is counted', () => {
		browser.pause(stickyAd.unstickTime);
		helpers.slowScroll(500);

		expect(browser.isExisting(stickyAd.stickedSlot), 'Top leaderboard should not stick')
			.to
			.be
			.false;
	});

	it('should unstick if close button is clicked', () => {
		helpers.slowScroll(100);

		expect(browser.isExisting(stickyAd.stickedSlot), 'Top leaderboard is not sticked')
			.to
			.be
			.true;

		browser.click(`${stickyAd.stickedSlot} ${stickyAd.classUnstickButton}`);

		expect(browser.isExisting(stickyAd.stickedSlot), 'Top leaderboard is not sticked')
			.to
			.be
			.false;
	});
});

