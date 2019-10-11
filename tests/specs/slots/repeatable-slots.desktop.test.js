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
		adStatus = adSlots.getSlotStatus(repeatableSlots.getRepeatableSlotSelector(1));
	});

	beforeEach(() => {
		$(repeatableSlots.getRepeatableSlotSelector(1)).waitForDisplayed(timeouts.standard);
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
		$(repeatableSlots.getRepeatableSlotSelector(1)).waitForDisplayed(timeouts.standard);
		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlotSelector(i));
			expect(
				$(repeatableSlots.getRepeatableSlotSelector(i + 1)).isDisplayed(),
				`Slot number ${i + 1} is not visible`,
			).to.be.true;
		}
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlotSelector(numberOfSlots));
		expect(
			$(repeatableSlots.getRepeatableSlotSelector(numberOfSlots + 1)).isDisplayed(),
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
		$(repeatableSlots.getRepeatableSlotSelector(1)).waitForDisplayed(timeouts.standard);
		for (let i = 1; i < numberOfSlots; i += 1) {
			repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlotSelector(i));
			expect(
				$(repeatableSlots.getRepeatableSlotSelector(i + 1)).isExisting(),
				`Slot number ${i + 1} is not visible`,
			).to.be.true;
			$(repeatableSlots.getRepeatableSlotSelector(i + 1)).scrollIntoView();
			browser.pause(timeouts.actions);
			expect(
				$(repeatableSlots.getRepeatableSlotSelector(i + 1)).isDisplayedInViewport(),
				`Slot number ${i + 1} is not visible`,
			).to.be.true;
		}
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlotSelector(numberOfSlots));
		expect(
			$(repeatableSlots.getRepeatableSlotSelector(numberOfSlots + 1)).isDisplayed(),
			'Slot not visible',
		).to.be.false;
	});

	it('Check if there is at least one viewport between slots', () => {
		helpers.navigateToUrl(repeatableSlots.pageLink, queryStrings.getLengthOfContent());
		$(repeatableSlots.getRepeatableSlotSelector(1)).waitForDisplayed(timeouts.standard);
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlotSelector(1));
		repeatableSlots.scrollBetweenBoxads(repeatableSlots.getRepeatableSlotSelector(2));
		expect($(repeatableSlots.getRepeatableSlotSelector(3)).isDisplayed()).to.be.true;
		helpers.slowScroll(adSlots.boxadHeight + 2, repeatableSlots.getRepeatableSlotSelector(2));
		expect($(repeatableSlots.getRepeatableSlotSelector(2)).isDisplayedInViewport()).to.be.false;
		expect($(repeatableSlots.getRepeatableSlotSelector(3)).isDisplayedInViewport()).to.be.false;
	});
});
