import emptyResponse from '../pages/empty-response.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Empty response page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(emptyResponse.pageLink);
		browser.waitForVisible(emptyResponse.article, timeouts.standard);
		adStatus = helpers.getSlotStatus(adSlots.topLeaderboard);
	});

	it('Check if slot is not visible', () => {
		helpers.waitForResult(adSlots.topLeaderboard, adSlots.adCollapsed);
		expect(adStatus.inViewport, 'Slot in viewport')
			.to
			.be
			.false;
	});
});

describe('Empty response page: top boxad', () => {
	let adStatus;

	before(() => {
		browser.url(emptyResponse.pageLink);
		browser.waitForVisible(emptyResponse.article, timeouts.standard);
		helpers.waitForResult(adSlots.topBoxad, adSlots.adCollapsed);
		adStatus = helpers.getSlotStatus(adSlots.topBoxad);
	});

	it('Check if slot is not visible', () => {
		expect(adStatus.inViewport, 'Slot in viewport')
			.to
			.be
			.false;
	});
});
