import { expect } from 'chai';
import { AdSlot } from '../../../src/ad-engine/models';
import { slotBillTheLizardStatusTrackingMiddleware } from '../../../src/ad-services/bill-the-lizard/slot-bill-the-lizard-tracking-middleware';

describe('slot-bill-the-lizard-tracking-middleware', () => {
	let adSlot;

	beforeEach(() => {
		adSlot = new AdSlot({ id: 'foo' });
		adSlot.setConfigProperty('btlStatus', 'rabbitMagic');
	});

	it('returns all info about slot for tracking', () => {
		const data = slotBillTheLizardStatusTrackingMiddleware((data) => data)(
			{ previous: 'value' },
			adSlot,
		);
		console.log(data);
		expect(data).to.deep.equal({
			btl: 'rabbitMagic',
			previous: 'value',
		});
	});
});
