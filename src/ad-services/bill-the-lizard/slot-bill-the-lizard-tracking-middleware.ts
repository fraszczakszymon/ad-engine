import { AdSlot } from '@wikia/ad-engine';
import {
	TrackingCallback,
	TrackingData,
	TrackingMiddleware,
} from '../../ad-tracking/slot-tracking-middleware';

export const slotBillTheLizardStatusTracking: TrackingMiddleware = (next: TrackingCallback) => (
	data: TrackingData,
	slot: AdSlot,
): void => {
	return next(
		{
			...data,

			btl: slot.getConfigProperty('btlStatus') || '',
		},
		slot,
	);
};
