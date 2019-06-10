import { expect } from 'chai';
import { AdSlot, context } from '../../src/ad-engine';
import { viewabilityTrackingMiddleware } from '../../src/ad-tracking';

describe('viewability-tracking-middleware', () => {
	let adSlot;

	beforeEach(() => {
		context.set('slots.foo.targeting', {
			rv: 5,
			wsi: 'ola1',
		});
		adSlot = new AdSlot({ id: 'foo' });
	});

	it('returns all general keys for tracking', () => {
		const data = viewabilityTrackingMiddleware((data) => data)({ previous: 'value' }, adSlot);

		expect(Object.keys(data)).to.deep.equal(['previous', 'rv', 'timestamp', 'tz_offset', 'wsi']);
	});

	it('returns general info for tracking', () => {
		const data = viewabilityTrackingMiddleware((data) => data)({ previous: 'value' }, adSlot);

		expect(data['rv']).to.equal(5);
		expect(data['wsi']).to.equal('ola1');
	});
});
