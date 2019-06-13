import { expect } from 'chai';
import { AdSlot, context } from '../../../src/ad-engine';
import { viewabilityPropertiesTrackingMiddleware } from '../../../src/ad-engine/tracking';

describe('viewability-properties-tracking-middleware', () => {
	let adSlot: AdSlot;

	beforeEach(() => {
		context.set('slots.foo.targeting', {
			rv: 5,
			wsi: 'ola1',
		});
		adSlot = new AdSlot({ id: 'foo' });
		adSlot.creativeId = 123;
		adSlot.lineItemId = 789;
	});

	it('returns all info about slot for tracking', () => {
		let data = null;

		viewabilityPropertiesTrackingMiddleware(
			{
				data: { previous: 'value' },
				slot: adSlot,
			},
			(context) => {
				data = context.data;
			},
		);

		expect(data).to.deep.equal({
			creative_id: 123,
			line_item_id: 789,
			previous: 'value',
			rv: 5,
			wsi: 'ola1',
		});
	});
});
