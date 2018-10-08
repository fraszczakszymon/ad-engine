import stickyAd from '../pages/sticky-ad.page';
import adSlots from '../common/adSlots';
import helpers from '../common/helpers';
import { timeouts } from '../common/timeouts';

const { expect } = require('chai');

describe('It will test sticky-ad page', () => {
	const stickedSlot = `${adSlots.topLeaderboard}${stickyAd.classStickyTemplate}${stickyAd.classStickySlot}`;

	beforeEach(() => {
		browser.url(stickyAd.pageLink);
		browser.waitForVisible(helpers.pageBody);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		browser.pause(250);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	it('will check if ad will stick and unstick', () => {
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

	it('will check if ad will not stick if viewability is counted', () => {
		browser.pause(stickyAd.unstickTime);
		browser.scroll(0, 500);

		expect(browser.isExisting(stickedSlot), 'Element should not stick')
			.to
			.be
			.false;
	});

	it('will check if ad will unstick if close button is clicked', () => {
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
