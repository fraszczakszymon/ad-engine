import { expect } from 'chai';
import { AdSlot } from '../../src/ad-engine';
import { viewabilityTrackingMiddleware } from '../../src/ad-tracking';

describe('viewability-tracking-middleware', () => {
	let adSlot: AdSlot;

	beforeEach(() => {
		adSlot = new AdSlot({ id: 'foo' });
	});

	it('returns all general keys for tracking', () => {
		let data = null;

		viewabilityTrackingMiddleware(
			{
				data: { previous: 'value' },
				slot: adSlot,
			},
			(middlewareContext) => {
				data = middlewareContext.data;

				return Promise.resolve();
			},
		);

		expect(Object.keys(data)).to.deep.equal(['previous', 'timestamp', 'tz_offset']);
	});
});
