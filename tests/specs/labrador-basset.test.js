import basset from '../pages/labrador-basset.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test labrador-basset page', () => {
	it('will test if cached value is stored', () => {
		const link = helpers.addParametersToUrl(basset.pageLink, [basset.ig + basset.returnIGParameters('XX', 50, basset.instantGlobalCached), basset.sessionIdParam('cachedSession')]);

		browser.url(link);
		browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);

		const currentValue = browser.getText(basset.wgVariablesStatuses);
		const nonCachedLink = helpers.addParametersToUrl(basset.pageLink, [basset.ig + basset.returnIGParameters('XX', 50), basset.sessionIdParam('cachedSession')]);

		for (let i = 0; i < 50; i += 1) {
			browser.url(nonCachedLink);
			browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);
			expect(browser.getText(basset.wgVariablesStatuses)).to.equal(currentValue, 'Incorrect Value');
		}
	});

	it('will check enabled state', () => {
		const nonCachedLink = helpers.addParametersToUrl(basset.pageLink, [basset.ig + basset.returnIGParameters('XX', 100), basset.sessionIdParam('enabled')]);
		browser.url(nonCachedLink);
		browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);
		expect(browser.getText(basset.wgVariablesStatuses)).to.equal('wgTestVariableAlpha: enabled', 'Incorrect Value');
	});

	it('will check disabled state', () => {
		const nonCachedLink = helpers.addParametersToUrl(basset.pageLink, [basset.ig + basset.returnIGParameters('XX', 0.000001), basset.sessionIdParam('disabled')]);
		browser.url(nonCachedLink);
		browser.waitForVisible(basset.wgVariablesStatuses, timeouts.standard);
		expect(browser.getText(basset.wgVariablesStatuses)).to.equal('wgTestVariableAlpha: disabled', 'Incorrect Value');
	});
});
