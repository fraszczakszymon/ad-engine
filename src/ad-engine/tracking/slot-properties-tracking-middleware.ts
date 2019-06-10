import { TrackingCallback, TrackingData, TrackingMiddleware } from '../../ad-tracking';
import { AdSlot } from '../models';

export const slotPropertiesTrackingMiddleware: TrackingMiddleware = (next: TrackingCallback) => (
	data: TrackingData,
	slot: AdSlot,
): void => {
	const now = new Date();
	const timestamp = now.getTime();
	const creativeSize = Array.isArray(slot.creativeSize)
		? slot.creativeSize.join('x')
		: slot.creativeSize;

	return next(
		{
			...data,

			ad_load_time: timestamp - window.performance.timing.connectStart,
			ad_status: slot.getStatus(),
			advertiser_id: slot.advertiserId || '',
			creative_id: slot.creativeId || '',
			creative_size: creativeSize || '',
			kv_pos: slot.getMainPositionName(),
			kv_rv: slot.getConfigProperty('targeting.rv') || '',
			kv_wsi: slot.getConfigProperty('targeting.wsi') || '',
			order_id: slot.orderId || '',
			product_lineitem_id: slot.lineItemId || '',
			slot_size: creativeSize || '',
		},
		slot,
	);
};
