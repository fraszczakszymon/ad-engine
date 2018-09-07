import floatingAd from '../pages/floating-ad.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test floating ad page', () => {
	beforeEach(() => {
		browser.url(floatingAd.pageLink);
	});


	it('will test visibility of floating ad', () => {
		browser.scroll(0, 1000);
		browser.waitForVisible(floatingAd.incontentBoxad, timeouts.standard);
		browser.scroll(0, 5000);
		const size = browser.getElementSize(floatingAd.incontentBoxad);
		expect(size.width)
			.to
			.equal(floatingAd.floatingAdWidth, 'Width incorrect');
		expect(size.height)
			.to
			.equal(floatingAd.floatingAdHeight, 'Height incorrect');
		expect(browser.isVisibleWithinViewport(floatingAd.incontentBoxadFloating))
			.to
			.be
			.true;
	});


	it('floating ad redirect on click', () => {
		browser.waitForVisible(floatingAd.incontentBoxad, timeouts.standard);
		browser.element(floatingAd.incontentBoxad)
			.click();

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});
});
