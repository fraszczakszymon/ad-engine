import { expect } from 'chai';
import * as sinon from 'sinon';
import { AdSlot } from '../../../src/ad-engine/models';
import { context } from '../../../src/ad-engine/services';
import { slotPropertiesTrackingMiddleware } from '../../../src/ad-engine/tracking';

describe('slot-properties-tracking-middleware', () => {
	const sandbox = sinon.createSandbox();
	const clock = sinon.useFakeTimers();
	let adSlot;

	beforeEach(() => {
		sandbox.stub(window, 'performance').value({
			timing: {
				connectStart: 250,
			},
		});

		context.set('slots.foo.targeting', {
			rv: 5,
			wsi: 'ola1',
		});
		adSlot = new AdSlot({ id: 'foo' });
		adSlot.advertiserId = 567;
		adSlot.creativeId = 123;
		adSlot.creativeSize = [728, 90];
		adSlot.lineItemId = 789;
		adSlot.orderId = 3;
		adSlot.status = 'success';
	});

	afterEach(() => {
		sandbox.restore();
		clock.restore();
	});

	it('returns all info about slot for tracking', () => {
		clock.tick(600);

		const data = slotPropertiesTrackingMiddleware((data) => data)({ previous: 'value' }, adSlot);

		expect(data).to.deep.equal({
			ad_load_time: 350,
			ad_status: 'success',
			advertiser_id: 567,
			creative_id: 123,
			creative_size: '728x90',
			kv_pos: 'foo',
			kv_rv: 5,
			kv_wsi: 'ola1',
			order_id: 3,
			previous: 'value',
			product_lineitem_id: 789,
			slot_size: '728x90',
		});
	});

	it('keeps ad_status if it was set before', () => {
		const data = slotPropertiesTrackingMiddleware((data) => data)({ ad_status: 'custom' }, adSlot);

		expect(data.ad_status).to.deep.equal('custom');
	});
});
