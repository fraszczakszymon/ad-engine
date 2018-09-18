import floatingAd from '../pages/floating-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test floating ad page', () => {
	beforeEach(() => {
		browser.url(floatingAd.pageLink);
	});

	it('will test visibility of floating ad', () => {
		browser.scroll(0, 1000);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		browser.scroll(0, 5000);

		const size = browser.getElementSize(adSlots.incontentBoxad);
		const tableOfErrors = [];

		try {
			expect(size.width)
				.to
				.equal(adSlots.boxadWidth, 'Floating ad width incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(size.height)
				.to
				.equal(adSlots.boxadHeight, 'Floating ad height incorrect');
		} catch (error) {
			tableOfErrors.push(error.message);
		}
		try {
			expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad), 'Incontent Boxad not in viewport')
				.to
				.be
				.true;
		} catch (error) {
			tableOfErrors.push(error.message);
		}

		expect(tableOfErrors.length, `Errors found: ${tableOfErrors.toString()}`)
			.to
			.be
			.empty;
	});

	it(' will test floating ad redirect on click', () => {
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
		browser.click(adSlots.incontentBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});
});
