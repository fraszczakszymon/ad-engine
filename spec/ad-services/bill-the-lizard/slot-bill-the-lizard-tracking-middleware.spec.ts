import { expect } from 'chai';
import { AdSlot } from '../../../src/ad-engine/models';
import { slotBillTheLizardStatusTrackingMiddleware } from '../../../src/ad-services/bill-the-lizard';

describe('slot-bill-the-lizard-tracking-middleware', () => {
	let adSlot: AdSlot;

	beforeEach(() => {
		adSlot = new AdSlot({ id: 'foo' });
		adSlot.setConfigProperty('btlStatus', 'rabbitMagic');
	});

	it('returns all info about slot for tracking', () => {
		let data = null;

		slotBillTheLizardStatusTrackingMiddleware(
			{
				data: { previous: 'value' },
				slot: adSlot,
			},
			(context) => {
				data = context.data;

				return Promise.resolve();
			},
		);

		expect(data).to.deep.equal({
			btl: 'rabbitMagic',
			previous: 'value',
		});
	});
});
