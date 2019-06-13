import { TrackingCallback, TrackingData, TrackingMiddleware } from '../../ad-tracking';
import { AdSlot } from '../models';

export const viewabilityPropertiesTrackingMiddleware: TrackingMiddleware = (
	next: TrackingCallback,
) => (data: TrackingData, slot: AdSlot): void => {
	return next(
		{
			...data,
			creative_id: slot.creativeId || '',
			line_item_id: slot.lineItemId || '',
			rv: slot.getConfigProperty('targeting.rv') || '',
			wsi: slot.getConfigProperty('targeting.wsi') || '',
		},
		slot,
	);
};
