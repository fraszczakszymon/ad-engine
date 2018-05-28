import { expect } from 'chai';
import sinon from 'sinon';
import adSlotFake from '../ad-slot-fake';
import { slotService } from '../../src/services/slot-service';

let adSlot,
	elementProperties = {};

describe('slot-service', () => {
	afterEach(() => {
		document.getElementById.restore();
	});

	beforeEach(() => {
		elementProperties = {
			offsetParent: {
				offsetTop: 0,
				offsetParent: null
			}
		};

		sinon.stub(document, 'getElementById').withArgs('foo-container').returns({
			classList: {
				contains: () => {}
			},
			offsetHeight: 300,
			offsetTop: 100,
			offsetParent: elementProperties.offsetParent,
			ownerDocument: {}
		});

		adSlot = Object.assign({}, adSlotFake);
		adSlot.getViewportConflicts = () => ['foo-container'];
		adSlot.hasDefinedViewportConflicts = () => true;
	});

	it('getter', () => {
		slotService.add(adSlot);

		expect(adSlot).to.equal(slotService.get('FAKE_AD'));
	});

	it('foreach iterator', () => {
		slotService.add(adSlot);

		slotService.forEach((slot) => {
			expect(slot).to.equal(slot);
		});
	});

	it('checks whether slot has viewport conflicts', () => {
		adSlot.setOffsetTop(500);

		expect(slotService.hasViewportConflict(adSlot)).to.equals(true);
	});

	it('checks whether slot does not have viewport conflicts (when there is enough space)', () => {
		adSlot.setOffsetTop(2000);

		expect(slotService.hasViewportConflict(adSlot)).to.equals(false);
	});

	it('does not calculate conflicts when slot does not have defined any', () => {
		adSlot.hasDefinedViewportConflicts = () => false;

		expect(slotService.hasViewportConflict(adSlot)).to.equals(false);
	});

	it('does not calculate conflicts when slot does not have DOM element', () => {
		adSlot.getElement = () => null;

		expect(slotService.hasViewportConflict(adSlot)).to.equals(false);
	});

	it('checks whether slot does not have viewport conflicts with hidden element', () => {
		elementProperties.offsetParent = null;

		adSlot.setOffsetTop(2000);

		expect(slotService.hasViewportConflict(adSlot)).to.equals(false);
	});
});
