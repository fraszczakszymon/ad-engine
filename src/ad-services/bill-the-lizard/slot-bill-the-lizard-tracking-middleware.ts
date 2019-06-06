import { AdSlot } from '@wikia/ad-engine';
import { TrackingData } from '../../ad-tracking/slot-tracking-middleware';

export function slotBillTheLizardStatusTracking(data: TrackingData, slot: AdSlot): TrackingData {
	return {
		...data,

		btl: slot.btlStatus || '',
	};
}
