import { expect } from 'chai';
import adSlotFake from '../ad-slot-fake';
import { slotService } from '../../src/services/slot-service';

describe('slot-service', () => {
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
});
