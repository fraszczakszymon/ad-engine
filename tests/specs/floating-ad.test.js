import floatingAd from '../pages/floating-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Floating ads page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(floatingAd.pageLink);
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

describe('Floating ads page: rail module', () => {
	let adStatus;

	before(() => {
		browser.url(floatingAd.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topBoxadRail);
	});

	beforeEach(() => {
		browser.waitForVisible(adSlots.topBoxadRail, timeouts.standard);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.topBoxadRail, adSlots.railModuleWidth, adSlots.railModuleHeight);

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
});

describe('Floating ad page: incontent boxad', () => {
	let adStatus;

	before(() => {
		browser.url(floatingAd.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.incontentBoxad);
	});

	beforeEach(() => {
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		browser.scroll(0, 5000);
	});

	it('Check dimensions', () => {
		const dimensions = helpers.checkSlotSize(adSlots.incontentBoxad, adSlots.boxadWidth, adSlots.boxadHeight);

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
		expect(helpers.adRedirect(adSlots.incontentBoxad), 'Wrong link after redirect')
			.to
			.be
			.true;
	});
});
