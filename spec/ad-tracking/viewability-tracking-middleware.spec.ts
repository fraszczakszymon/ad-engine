import { expect } from 'chai';
import { AdSlot } from '../../src/ad-engine';
import { viewabilityTrackingMiddleware } from '../../src/ad-tracking';

describe('viewability-tracking-middleware', () => {
	let adSlot: AdSlot;

	beforeEach(() => {
		adSlot = new AdSlot({ id: 'foo' });
	});

	it('returns all general keys for tracking', () => {
		const data = viewabilityTrackingMiddleware((data) => data)({ previous: 'value' }, adSlot);

		expect(Object.keys(data)).to.deep.equal(['previous', 'timestamp', 'tz_offset']);
	});
});
