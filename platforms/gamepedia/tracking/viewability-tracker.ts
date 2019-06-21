import { AdSlot, AdSlotData } from '@wikia/ad-engine';
import { DataWarehouseTracker } from './data-warehouse';
import { TrackingParams } from './models/tracking-params';

export class ViewabilityTracker {
	/**
	 * Prepare data for render ended trackingParams
	 */
	private static prepareData(slot: AdSlot, data: AdSlotData): TrackingParams {
		return {
			pv_unique_id: window.pvUID,
			line_item_id: +data.line_item_id,
			creative_id: +data.creative_id,
			rv: slot.getTargeting().rv || 1,
			timestamp: data.timestamp,
			tz_offset: new Date().getTimezoneOffset(),
		};
	}

	private viewabilityUrl = 'https://beacon.wikia-services.com/__track/special/adengviewability';

	/**
	 * Track viewabiltiy impression to data warehouse
	 */
	onImpressionViewable(adSlot: AdSlot, data: AdSlotData): void {
		const dataWarehouseTracker = new DataWarehouseTracker();

		dataWarehouseTracker.track(ViewabilityTracker.prepareData(adSlot, data), this.viewabilityUrl);
	}
}
