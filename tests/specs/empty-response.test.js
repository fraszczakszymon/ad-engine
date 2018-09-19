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

		const tableOfErrors = [];

		try {
			expect(browser.isExisting(`${adSlots.topLeaderboard}${helpers.classHidden}`), 'Element does not exist')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topLeaderboard), 'Top leaderboard not visible in viewport')
				.to
				.be
				.false;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});
	it('will test if top boxad is not visible', () => {
		browser.isExisting(adSlots.topBoxad, timeouts.standard);

		const tableOfErrors = [];

		try {
			expect(browser.isExisting(`${adSlots.topBoxad}${helpers.classHidden}`), 'Top boxad exists in code')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.topBoxad), 'Top boxad is visible in viewport')
				.to
				.be
				.false;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.equal(0);
	});
});
