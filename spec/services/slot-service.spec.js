import { expect } from 'chai';
import sinon from 'sinon';
import adSlotFake from '../ad-slot-fake';
import { slotService } from '../../src/services/slot-service';

let adSlot;

describe('slot-service', () => {
	afterEach(() => {
		document.getElementById.restore();
	});

	beforeEach(() => {
		sinon.stub(document, 'getElementById').withArgs('foo-container').returns({
			classList: {
				contains: () => {}
			},
			offsetHeight: 300,
			offsetTop: 100,
			offsetParent: null,
			ownerDocument: {}
		});

		adSlot = Object.assign({}, adSlotFake);
		adSlot.getViewportConflicts = () => ['foo-container'];
	});

	it('getter by id', () => {
		slotService.add(adSlot);

		expect(adSlot).to.equal(slotService.get('gpt-fake-ad'));
	});

	it('getter by slot name', () => {
		slotService.add(adSlot);

		expect(adSlot).to.equal(slotService.getBySlotName('FAKE_AD'));
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
});
