import {
	TrackingCallback,
	TrackingData,
	TrackingMiddleware,
} from '../../ad-tracking/slot-tracking-middleware';
import { AdSlot } from '../models';

export const viewabilityPropertiesTrackingMiddleware: TrackingMiddleware = (
	next: TrackingCallback,
) => (data: TrackingData, slot: AdSlot): void => {
	return next(
		{
			...data,

			creative_id: slot.creativeId || '',
			line_item_id: slot.lineItemId || '',
		},
		slot,
	);
};
