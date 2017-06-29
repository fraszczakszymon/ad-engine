import SlotDataParamsUpdater from '../../src/services/slot-data-params-updater';

QUnit.module('SlotDataParamsUpdater test', {});

function mockAdSlot(sizes) {
	return { getSizes: () => sizes };
}

QUnit.test('adding correct size values', (assert) => {
	assert.expect(1);

	const sizes = [{ viewportSize: [728, 0], sizes: [[728, 90]] }];

	assert.equal(
		SlotDataParamsUpdater.getSlotSizes(mockAdSlot(sizes)),
		'{"728x0":[[728,90]]}'
	);
});

QUnit.test('adding multiple size values', (assert) => {
	assert.expect(1);

	const sizes = [
		{ viewportSize: [728, 0], sizes: [[728, 90], [300, 250]] },
	];

	assert.equal(
		SlotDataParamsUpdater.getSlotSizes(mockAdSlot(sizes)),
		'{"728x0":[[728,90],[300,250]]}'
	);
});

QUnit.test('adding multiple size values in different viewports', (assert) => {
	assert.expect(1);

	const sizes = [
		{ viewportSize: [728, 0], sizes: [[728, 90], [300, 250]] },
		{ viewportSize: [768, 0], sizes: [[300, 250], [300, 600]] }
	];

	assert.equal(
		SlotDataParamsUpdater.getSlotSizes(mockAdSlot(sizes)),
		'{"728x0":[[728,90],[300,250]],"768x0":[[300,250],[300,600]]}'
	);
});
