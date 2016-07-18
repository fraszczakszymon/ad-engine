'use strict';

import adSlotFake from '../ad-slot-fake';
import SlotService from '../../src/services/slot-service';

QUnit.module('SlotService test', {});

QUnit.test('getter by id', function (assert) {
	assert.expect(1);

	SlotService.add(adSlotFake);

	assert.equal(adSlotFake, SlotService.get('gpt-mock-ad'));
});

QUnit.test('getter by slot name', function (assert) {
	assert.expect(1);

	SlotService.add(adSlotFake);

	assert.equal(adSlotFake, SlotService.getBySlotName('MOCK_AD'));
});

QUnit.test('foreach iterator', function (assert) {
	assert.expect(1);

	SlotService.add(adSlotFake);

	SlotService.forEach((adSlot) => {
		assert.equal(adSlotFake, adSlot);
	});
});
