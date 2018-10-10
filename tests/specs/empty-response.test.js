import emptyResponse from '../pages/empty-response.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

xdescribe('Empty response page: top leaderboard', () => {
	let adStatus;

	before(() => {
		browser.url(emptyResponse.pageLink);
		adStatus = helpers.checkSlotStatus(adSlots.topLeaderboard);
	});

	beforeEach(() => {
		browser.waitForVisible(emptyResponse.asideClass, timeouts.standard);
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
		browser.waitForVisible(emptyResponse.asideClass, timeouts.standard);
		adStatus = helpers.checkSlotStatus(adSlots.topBoxad);
	});

	it('Check if slot is not visible', () => {
		helpers.waitForResult(adSlots.topBoxad, adSlots.adCollapsed);
		expect(adStatus.inViewport, 'Slot in viewport')
			.to
			.be
			.false;
	});
});
