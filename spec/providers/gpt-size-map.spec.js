import { expect } from 'chai';
import { GptSizeMap } from '../../src/providers/gpt-size-map';

describe('gpt-size-map', () => {
	it('casts correct size values to string', () => {
		const sizes = [{ viewportSize: [728, 0], sizes: [[728, 90]] }];


		expect(new GptSizeMap(sizes).toString())
			.to.equal('{"728x0":[[728,90]]}');
	});

	it('casts multiple size values to string', () => {
		const sizes = [
			{ viewportSize: [728, 0], sizes: [[728, 90], [300, 250]] }
		];

		expect(new GptSizeMap(sizes).toString())
			.to.equal('{"728x0":[[728,90],[300,250]]}');
	});

	it('casts multiple size values in different viewports to string', () => {
		const sizes = [
			{ viewportSize: [728, 0], sizes: [[728, 90], [300, 250]] },
			{ viewportSize: [768, 0], sizes: [[300, 250], [300, 600]] }
		];

		expect(new GptSizeMap(sizes).toString())
			.to.equal('{"728x0":[[728,90],[300,250]],"768x0":[[300,250],[300,600]]}');
	});
});
