import { expect } from 'chai';
import basset from '../../pages/labrador-basset.page';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';
import { queryStrings } from '../../common/query-strings';

describe('It will test labrador-basset page', () => {
	it('will test if cached value is stored', () => {
		helpers.navigateToUrl(
			basset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				50,
				basset.instantGlobalCached
			),
			queryStrings.getSessionIdParam('cachedSession')
		);

		browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);

		const currentValue = browser.getText(basset.wgVariablesStatuses);
		const nonCachedLink = queryStrings.getUrl(
			basset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				50
			),
			queryStrings.getSessionIdParam('cachedSession'));

		for (let i = 0; i < 50; i += 1) {
			browser.url(nonCachedLink);
			browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);
			expect(browser.getText(basset.wgVariablesStatuses)).to.equal(currentValue, 'Incorrect Value');
		}
	});

	it('will check enabled state', () => {
		helpers.navigateToUrl(
			basset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				100,
				basset.instantGlobalCached
			),
			queryStrings.getSessionIdParam('enabled')
		);

		browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);
		expect(browser.getText(basset.wgVariablesStatuses)).to.equal('wgTestVariableAlpha: enabled', 'Incorrect Value');
	});

	it('will check disabled state', () => {
		helpers.navigateToUrl(
			basset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				0.000001,
				basset.instantGlobalCached
			),
			queryStrings.getSessionIdParam('disabled')
		);

		browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);
		expect(browser.getText(basset.wgVariablesStatuses)).to.equal('wgTestVariableAlpha: disabled', 'Incorrect Value');
	});
});
