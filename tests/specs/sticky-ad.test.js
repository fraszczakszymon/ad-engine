import stickyAd from '../pages/sticky-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';

const { expect } = require('chai');

describe('sticky-ad template', () => {
	const stickedSlot = `${adSlots.topLeaderboard}${stickyAd.classStickyTemplate}${stickyAd.classStickySlot}`;

	beforeEach(() => {
		browser.url(stickyAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.pause(250);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('should stick and unstick', () => {
		expect(browser.isExisting(stickedSlot), 'Element is sticked too soon')
			.to
			.be
			.false;

		browser.scroll(0, 500);

		expect(browser.isExisting(stickedSlot), 'Element is not sticked')
			.to
			.be
			.true;

		browser.pause(stickyAd.unstickTime);
		browser.scroll(0, 1000);
		browser.pause(stickyAd.unstickAnimationTime);

		expect(browser.isExisting(stickedSlot), 'Element is not unsticked properly')
			.to
			.be
			.false;
	});

	it('should not stick if viewability is counted', () => {
		browser.pause(stickyAd.unstickTime);
		browser.scroll(0, 500);

		expect(browser.isExisting(stickedSlot), 'Element should not stick')
			.to
			.be
			.false;
	});

	it('should unstick if close button is clicked', () => {
		browser.scroll(0, 100);

		expect(browser.isExisting(stickedSlot), 'Element is not sticked')
			.to
			.be
			.true;

		browser.click(`${stickedSlot} ${stickyAd.classUnstickButton}`);

		expect(browser.isExisting(stickedSlot), 'Element is not sticked')
			.to
			.be
			.false;
	});
});
