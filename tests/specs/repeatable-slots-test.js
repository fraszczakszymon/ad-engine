import repeatableSlots from '../pages/repeatable-slots.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('It will test repeatable slots ads ', () => {
	beforeEach(() => {
		browser.url(repeatableSlots.pageLink);
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
	});

	xit('will test first boxad visibility and dimensions', () => {
		const size = browser.getElementSize(repeatableSlots.getRepeatableSlot(1));

		expect(size.width)
			.to
			.equal(repeatableSlots.boxadWidth, 'Width incorrect');
		expect(size.height)
			.to
			.equal(repeatableSlots.boxadHeight, 'Height incorrect');
		expect(browser.isVisibleWithinViewport(repeatableSlots.getRepeatableSlot(1)))
			.to
			.be
			.true;
	});

	xit('will test redirect on click', () => {
		browser.click(repeatableSlots.getRepeatableSlot(1));

		const tabIds = browser.getTabIds();

		browser.switchTab(tabIds[1]);
		helpers.waitForUrl(helpers.newsAndStories);
		expect(browser.getUrl())
			.to
			.equal(helpers.newsAndStories);
		helpers.closeNewTabs();
	});

	it('will test last slot visibility with a limit to 3', () => {
		const numberOfSlots = 3;

		browser.url(helpers.addParametersToUrl(repeatableSlots.pageLink, [repeatableSlots.setLimitOfSlots(3), repeatableSlots.setLengthOfContent(5)]));
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);

		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(i));
			expect(browser.isVisible(repeatableSlots.getRepeatableSlot(i + 1)), `Slot number ${i + 1} is not visible`).to.be.true;
		}
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(numberOfSlots));

		expect(browser.isVisible(repeatableSlots.getRepeatableSlot(numberOfSlots + 1)))
			.to
			.be
			.false;
	});

	xit('will test 8 boxads', () => {
		const numberOfSlots = 8;

		browser.url(helpers.addParametersToUrl(repeatableSlots.pageLink, [repeatableSlots.setLengthOfContent(5)]));
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);

		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(i));
			expect(browser.isVisible(repeatableSlots.getRepeatableSlot(i + 1)), `Slot number ${i + 1} is not visible`).to.be.true;
		}

		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(numberOfSlots));

		expect(browser.isVisible(repeatableSlots.getRepeatableSlot(numberOfSlots + 1)))
			.to
			.be
			.false;
	});
});
