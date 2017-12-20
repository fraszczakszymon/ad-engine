import { expect } from 'chai';
import adSlotFake from '../ad-slot-fake';
import SlotService from '../../src/services/slot-service';

describe('slot-service', () => {
	it('getter by id', () => {
		SlotService.add(adSlotFake);

		expect(adSlotFake).to.equal(SlotService.get('gpt-fake-ad'));
	});

	it('getter by slot name', () => {
		SlotService.add(adSlotFake);

		expect(adSlotFake).to.equal(SlotService.getBySlotName('FAKE_AD'));
	});

	it('foreach iterator', () => {
		SlotService.add(adSlotFake);

		SlotService.forEach((adSlot) => {
			expect(adSlotFake).to.equal(adSlot);
		});
	});
});
