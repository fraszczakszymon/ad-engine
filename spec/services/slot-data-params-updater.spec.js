import { expect } from 'chai';
import { slotDataParamsUpdater } from '../../src/services/slot-data-params-updater';

function mockAdSlot(sizes) {
	return { getSizes: () => sizes };
}

describe('slot-data-params-updater', () => {
	it('adding correct size values', () => {
		const sizes = [{ viewportSize: [728, 0], sizes: [[728, 90]] }];

		expect(slotDataParamsUpdater.getSlotSizes(mockAdSlot(sizes)))
			.to.equal('{"728x0":[[728,90]]}');
	});

	it('adding multiple size values', () => {
		const sizes = [
			{ viewportSize: [728, 0], sizes: [[728, 90], [300, 250]] }
		];

		expect(slotDataParamsUpdater.getSlotSizes(mockAdSlot(sizes)))
			.to.equal('{"728x0":[[728,90],[300,250]]}');
	});

	it('adding multiple size values in different viewports', () => {
		const sizes = [
			{ viewportSize: [728, 0], sizes: [[728, 90], [300, 250]] },
			{ viewportSize: [768, 0], sizes: [[300, 250], [300, 600]] }
		];

		expect(slotDataParamsUpdater.getSlotSizes(mockAdSlot(sizes)))
			.to.equal('{"728x0":[[728,90],[300,250]],"768x0":[[300,250],[300,600]]}');
	});
});
