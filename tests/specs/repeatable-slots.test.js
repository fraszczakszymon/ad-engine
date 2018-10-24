import repeatableSlots from '../pages/repeatable-slots.page';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';
import adSlots from '../common/adSlots';

const { expect } = require('chai');

describe('Repeatable slots ads', () => {
	let adStatus;

	before(() => {
		browser.url(repeatableSlots.pageLink);
		adStatus = helpers.getSlotStatus(repeatableSlots.getRepeatableSlot(1));
	});

	beforeEach(() => {
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
	});

	it('Check if first boxad is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check if last slot is visible with a limit to 3', () => {
		const numberOfSlots = 3;

		browser.url(helpers.addParametersToUrl(repeatableSlots.pageLink, [repeatableSlots.setLimitOfSlots(3), repeatableSlots.setLengthOfContent(5)]));
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(i));
			expect(browser.isVisible(repeatableSlots.getRepeatableSlot(i + 1)), `Slot number ${i + 1} is not visible`).to.be.true;
		}
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(numberOfSlots));
		expect(browser.isVisible(repeatableSlots.getRepeatableSlot(numberOfSlots + 1)), 'Slot not visible')
			.to
			.be
			.false;
	});

	it('Check if 8th boxad is visible', () => {
		const numberOfSlots = 8;

		browser.url(helpers.addParametersToUrl(repeatableSlots.pageLink, [repeatableSlots.setLengthOfContent(5)]));
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(i));
			expect(browser.isVisible(repeatableSlots.getRepeatableSlot(i + 1)), `Slot number ${i + 1} is not visible`).to.be.true;
		}
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(numberOfSlots));
		expect(browser.isVisible(repeatableSlots.getRepeatableSlot(numberOfSlots + 1)), 'Slot not visible')
			.to
			.be
			.false;
	});

	it('Check if there is at least one viewport between slots', () => {
		browser.url(helpers.addParametersToUrl(repeatableSlots.pageLink, [repeatableSlots.setLengthOfContent(5)]));
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(1));
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(2));
		expect(browser.isVisible(repeatableSlots.getRepeatableSlot(3)))
			.to
			.be
			.true;
		browser.scroll(repeatableSlots.getRepeatableSlot(2), 0, adSlots.boxadHeight + 2);
		expect(browser.isVisibleWithinViewport(repeatableSlots.getRepeatableSlot(2)))
			.to
			.be
			.false;
		expect(browser.isVisibleWithinViewport(repeatableSlots.getRepeatableSlot(3)))
			.to
			.be
			.false;
	});
});
