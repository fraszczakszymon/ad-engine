import reporter from 'wdio-allure-reporter';
import btfOnlyAd from '../pages/btf-only-ad.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test btf ads', () => {
	beforeEach(() => {
		browser.url(btfOnlyAd.pageLink);
		browser.waitForVisible(btfOnlyAd.finishQueueButton, timeouts.standard);
		browser.click(btfOnlyAd.finishQueueButton);
		helpers.slowScroll(2500);
		browser.waitForVisible(adSlots.incontentBoxad, timeouts.standard);
	});

	it('will test the visibility of btf ad after manually finishing the queue', () => {
		reporter.severity('Critical');

		const size = browser.getElementSize(adSlots.incontentBoxad);

		expect(size.width)
			.to
			.equal(adSlots.boxadWidth, 'BTF ad width incorrect');
		expect(size.height)
			.to
			.equal(adSlots.boxadHeight, 'BTF ad height incorrect');
		expect(browser.isVisibleWithinViewport(adSlots.incontentBoxad))
			.to
			.be
			.true;
	});

	it('will test redirect on click', () => {
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
