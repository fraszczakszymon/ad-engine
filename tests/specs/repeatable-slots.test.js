import repeatableSlots from '../pages/repeatable-slots.page';
import adSlots from '../common/adSlots';
import { timeouts } from '../common/timeouts';
import helpers from '../common/helpers';

const { expect } = require('chai');

describe('Repeatable slots ads', () => {
	let adStatus;

	before(() => {
		browser.url(repeatableSlots.pageLink);
		adStatus = helpers.checkSlotStatus(repeatableSlots.getRepeatableSlot(1));
	});

	beforeEach(() => {
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
	});

	it('Check first boxad visibility', () => {
		expect(adStatus.inViewport, 'Not in viewport')
			.to
			.be
			.true;
	});

	it('Check first boxad dimensions', () => {
		const dimensions = helpers.checkSlotSize(repeatableSlots.getRepeatableSlot(1), adSlots.boxadWidth, adSlots.boxadHeight);

		expect(dimensions.status, dimensions.capturedErrors)
			.to
			.be
			.true;
	});

	it('Check redirect on click', () => {
		expect(helpers.adRedirect(repeatableSlots.getRepeatableSlot(1)), 'Wrong link after redirect')
			.to
			.be
			.true;
	});

	it('Check last slot visibility with a limit to 3', () => {
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

	it('Check 8th boxad visibility', () => {
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
});
