'use strict';

import adSlotMock from './ad-slot-mock';
import SlotService from '../../src/services/slot-service';

QUnit.module('SlotService test', {});

QUnit.test('getter by id', function (assert) {
	assert.expect(1);

	SlotService.add(adSlotMock);

	assert.equal(adSlotMock, SlotService.get('gpt-mock-ad'));
});

QUnit.test('getter by slot name', function (assert) {
	assert.expect(1);

	SlotService.add(adSlotMock);

	assert.equal(adSlotMock, SlotService.getBySlotName('MOCK_AD'));
});

QUnit.test('foreach iterator', function (assert) {
	assert.expect(1);

	SlotService.add(adSlotMock);

	SlotService.forEach((adSlot) => {
		assert.equal(adSlotMock, adSlot);
	});
});
