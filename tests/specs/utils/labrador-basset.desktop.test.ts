import { expect } from 'chai';
import { labradorBasset } from '../../pages/labrador-basset.page';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';
import { queryStrings } from '../../common/query-strings';

describe('It will test labrador-basset page', () => {
	it('will test if cached value is stored', () => {
		helpers.navigateToUrl(
			labradorBasset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				50,
				labradorBasset.instantGlobalCached,
			),
			queryStrings.getSessionIdParam('cachedSession'),
		);

		browser.waitForVisible(labradorBasset.wgVariablesStatuses, timeouts.standard);

		const currentValue = browser.getText(labradorBasset.wgVariablesStatuses);
		const nonCachedLink = queryStrings.getUrl(
			labradorBasset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				50,
			),
			queryStrings.getSessionIdParam('cachedSession'),
		);

		for (let i = 0; i < 50; i += 1) {
			browser.url(nonCachedLink);
			browser.waitForVisible(labradorBasset.wgVariablesStatuses, timeouts.standard);
			expect(browser.getText(labradorBasset.wgVariablesStatuses)).to.equal(
				currentValue,
				'Incorrect Value',
			);
		}
	});

	it('will check enabled state', () => {
		helpers.navigateToUrl(
			labradorBasset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				100,
				labradorBasset.instantGlobalCached,
			),
			queryStrings.getSessionIdParam('enabled'),
		);

		browser.waitForVisible(labradorBasset.wgVariablesStatuses, timeouts.standard);
		expect(browser.getText(labradorBasset.wgVariablesStatuses)).to.equal(
			'wgTestVariableAlpha: enabled',
			'Incorrect Value',
		);
	});

	it('will check disabled state', () => {
		helpers.navigateToUrl(
			labradorBasset.pageLink,
			queryStrings.constructInstantGlobal(
				queryStrings.instantGlobals.labradorTestVariableAlpha,
				'XX',
				0.000001,
				labradorBasset.instantGlobalCached,
			),
			queryStrings.getSessionIdParam('disabled'),
		);

		browser.waitForVisible(labradorBasset.wgVariablesStatuses, timeouts.standard);
		expect(browser.getText(labradorBasset.wgVariablesStatuses)).to.equal(
			'wgTestVariableAlpha: disabled',
			'Incorrect Value',
		);
	});
});
