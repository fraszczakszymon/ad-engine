import { TrackingData } from '../../ad-tracking/slot-tracking-middleware';
import { AdSlot } from '../models';

export function slotInfoTracking(data: TrackingData, slot: AdSlot): TrackingData {
	const now = new Date();
	const timestamp = now.getTime();
	const creativeSize = Array.isArray(slot.creativeSize)
		? slot.creativeSize.join('x')
		: slot.creativeSize;

	return {
		...data,

		ad_load_time: timestamp - window.performance.timing.connectStart,
		ad_status: slot.getStatus(),
		advertiser_id: slot.advertiserId || '',
		creative_id: slot.creativeId || '',
		creative_size: creativeSize || '',
		kv_pos: slot.getMainPositionName(),
		order_id: slot.orderId || '',
		product_lineitem_id: slot.lineItemId || '',
		slot_size: creativeSize || '',
	};
}
