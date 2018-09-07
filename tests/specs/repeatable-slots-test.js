import repeatableSlots from '../pages/repeatable-slots.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test repeatable slots ads ', () => {
	beforeEach(() => {
		browser.url(repeatableSlots.pageLink);
	});

	xit('will test first boxad visibility and dimensions', () => {
		browser.waitForVisible(repeatableSlots.firstRepeatableBoxad, timeouts.standard);

		const size = browser.getElementSize(repeatableSlots.firstRepeatableBoxad);

		expect(size.width)
			.to
			.equal(300, 'Width incorrect');
		expect(size.height)
			.to
			.equal(250, 'Height incorrect');
		expect(browser.isVisibleWithinViewport(repeatableSlots.firstRepeatableBoxad))
			.to
			.be
			.true;
	});

	xit('will test redirection to news and stories after clicking on an ad', () => {
		browser.waitForVisible(repeatableSlots.firstRepeatableBoxad, timeouts.standard);
		browser.click(repeatableSlots.firstRepeatableBoxad);

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
	});

	xit('will test second boxad visibility and dimensions', () => {
		browser.waitForVisible(repeatableSlots.secondRepeatableBoxad, timeouts.standard);

		const size = browser.getElementSize(repeatableSlots.secondRepeatableBoxad);

		expect(size.width)
			.to
			.equal(300, 'Width incorrect');
		expect(size.height)
			.to
			.equal(250, 'Height incorrect');
		expect(browser.isVisibleWithinViewport(repeatableSlots.secondRepeatableBoxad))
			.to
			.be
			.true;
	});
});
