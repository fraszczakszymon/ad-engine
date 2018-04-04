import { expect } from 'chai';
import sinon from 'sinon';
import adSlotFake from '../ad-slot-fake';
import { slotService } from '../../src/services/slot-service';

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
	});

	it('getter by id', () => {
		slotService.add(adSlotFake);

		expect(adSlotFake).to.equal(slotService.get('gpt-fake-ad'));
	});

	it('getter by slot name', () => {
		slotService.add(adSlotFake);

		expect(adSlotFake).to.equal(slotService.getBySlotName('FAKE_AD'));
	});

	it('foreach iterator', () => {
		slotService.add(adSlotFake);

		slotService.forEach((adSlot) => {
			expect(adSlotFake).to.equal(adSlot);
		});
	});

	it('checks whether slot has viewport conflicts', () => {
		adSlotFake.setOffsetTop(500);

		expect(slotService.hasViewportConflict(adSlotFake)).to.equals(true);
	});

	it('checks whether slot does not have viewport conflicts (when there is enough space)', () => {
		adSlotFake.setOffsetTop(2000);

		expect(slotService.hasViewportConflict(adSlotFake)).to.equals(false);
	});
});
