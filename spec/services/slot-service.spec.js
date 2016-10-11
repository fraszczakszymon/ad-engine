import adSlotFake from '../ad-slot-fake';
import SlotService from '../../src/services/slot-service';

QUnit.module('SlotService test', {});

QUnit.test('getter by id', (assert) => {
	assert.expect(1);

	SlotService.add(adSlotFake);

	assert.equal(adSlotFake, SlotService.get('gpt-fake-ad'));
});

QUnit.test('getter by slot name', (assert) => {
	assert.expect(1);

	SlotService.add(adSlotFake);

	assert.equal(adSlotFake, SlotService.getBySlotName('FAKE_AD'));
});

QUnit.test('foreach iterator', (assert) => {
	assert.expect(1);

	SlotService.add(adSlotFake);

	SlotService.forEach((adSlot) => {
		assert.equal(adSlotFake, adSlot);
	});
});
