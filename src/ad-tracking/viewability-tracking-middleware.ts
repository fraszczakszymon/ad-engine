import { AdSlot } from '@wikia/ad-engine';
import { TrackingCallback, TrackingData, TrackingMiddleware } from './slot-tracking-middleware';

export const viewabilityTrackingMiddleware: TrackingMiddleware = (next: TrackingCallback) => (
	data: TrackingData,
	slot: AdSlot,
): void => {
	const now = new Date();

	return next(
		{
			...data,

			rv: slot.getTargeting().rv || '',
			timestamp: now.getTime(),
			tz_offset: now.getTimezoneOffset(),
			wsi: slot.getTargeting().wsi || '',
		},
		slot,
	);
};
