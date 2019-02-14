import { expect } from 'chai';
import { repeatableSlots } from '../../pages/repeatable-slots.page';
import { timeouts } from '../../common/timeouts';
import { helpers } from '../../common/helpers';
import { queryStrings } from '../../common/query-strings';
import { adSlots } from '../../common/ad-slots';

describe('Repeatable slots ads', () => {
	let adStatus;

	before(() => {
		browser.url(repeatableSlots.pageLink);
		adStatus = adSlots.getSlotStatus(repeatableSlots.getRepeatableSlot(1));
	});

	beforeEach(() => {
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
	});

	it('Check if first boxad is visible', () => {
		expect(adStatus.inViewport, 'Not in viewport').to.be.true;
	});

	it('Check if last slot is visible with a limit to 4', () => {
		const numberOfSlots = 4;
		const lengthOfContent = 5;

		helpers.navigateToUrl(
			repeatableSlots.pageLink,
			queryStrings.getLimitOfSlots(numberOfSlots),
			queryStrings.getLengthOfContent(lengthOfContent),
		);
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(i));
			expect(
				browser.isVisible(repeatableSlots.getRepeatableSlot(i + 1)),
				`Slot number ${i + 1} is not visible`,
			).to.be.true;
		}
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(numberOfSlots));
		expect(
			browser.isVisible(repeatableSlots.getRepeatableSlot(numberOfSlots + 1)),
			'Slot not visible',
		).to.be.false;
	});

	it('Check if 8th boxad is visible', () => {
		const numberOfSlots = 8;
		const lengthOfContent = 10;

		helpers.navigateToUrl(
			repeatableSlots.pageLink,
			queryStrings.getLengthOfContent(lengthOfContent),
		);
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(i));
			expect(
				browser.isExisting(repeatableSlots.getRepeatableSlot(i + 1)),
				`Slot number ${i + 1} is not visible`,
			).to.be.true;
			browser.scroll(repeatableSlots.getRepeatableSlot(i + 1)).pause(timeouts.actions);
			expect(
				browser.isVisibleWithinViewport(repeatableSlots.getRepeatableSlot(i + 1)),
				`Slot number ${i + 1} is not visible`,
			).to.be.true;
		}
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(numberOfSlots));
		expect(
			browser.isVisible(repeatableSlots.getRepeatableSlot(numberOfSlots + 1)),
			'Slot not visible',
		).to.be.false;
	});

	it('Check if there is at least one viewport between slots', () => {
		helpers.navigateToUrl(repeatableSlots.pageLink, queryStrings.getLengthOfContent());
		browser.waitForVisible(repeatableSlots.getRepeatableSlot(1), timeouts.standard);
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(1));
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlot(2));
		expect(browser.isVisible(repeatableSlots.getRepeatableSlot(3))).to.be.true;
		browser.scroll(repeatableSlots.getRepeatableSlot(2), 0, adSlots.boxadHeight + 2);
		expect(browser.isVisibleWithinViewport(repeatableSlots.getRepeatableSlot(2))).to.be.false;
		expect(browser.isVisibleWithinViewport(repeatableSlots.getRepeatableSlot(3))).to.be.false;
	});
});
