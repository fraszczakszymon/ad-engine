import emptyResponse from '../pages/empty-response.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test empty response page', () => {
	beforeEach(() => {
		browser.url(emptyResponse.pageLink);
		browser.waitForVisible(emptyResponse.articleClass, timeouts.standard);
	});

	it('will test if top leaderboard ad is not visible', () => {
		browser.isExisting(adSlots.topLeaderboard, timeouts.standard);
		expect(browser.isExisting(`${adSlots.topLeaderboard}${helpers.classHidden}`))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard))
			.to
			.be
			.false;
	});
	it('will test if top boxad is not visible', () => {
		browser.isExisting(adSlots.topBoxad, timeouts.standard);
		expect(browser.isExisting(`${adSlots.topBoxad}${helpers.classHidden}`))
			.to
			.be
			.true;
		expect(browser.isVisibleWithinViewport(adSlots.topBoxad))
			.to
			.be
			.false;
	});
});
