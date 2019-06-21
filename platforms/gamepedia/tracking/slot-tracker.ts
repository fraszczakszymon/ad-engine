import { AdSlot, AdSlotData, context, trackingOptIn, utils } from '@wikia/ad-engine';
import { cmpWrapper } from '../cmp/cmp-wrapper';
import { DataWarehouseTracker } from './data-warehouse';
import { AdSlotTrackingData } from './models/ad-slot-tracking-data';

const slotTrackingURL = 'https://beacon.wikia-services.com/__track/special/adengadinfo';
const onChangeStatusToTrack = ['blocked', 'error', 'viewport-conflict', 'top-conflict'];

export class SlotTracker {
	/**
	 * Prepare data for render ended trackingParams
	 */
	private static prepareData(slot: AdSlot, data: AdSlotData): Partial<AdSlotTrackingData> {
		const country = context.get('targeting.geo');
		const optIn = context.get('options.trackingOptIn');
		const userConsented = trackingOptIn.isOptedIn() ? 'yes' : 'no';

		return {
			country,
			pv_unique_id: window.pvUID,
			pv: window.pvNumber,
			browser: data.browser,
			device: utils.client.getDeviceType(),
			time_bucket: data.time_bucket,
			timestamp: data.timestamp,
			tz_offset: new Date().getTimezoneOffset(),
			advertiser_id: data.advertiser_id,
			product_lineitem_id: +data.line_item_id,
			order_id: data.order_id,
			creative_id: data.creative_id,
			creative_size: data.creative_size,
			slot_size: data.creative_size,
			ad_status: data.status,
			page_width: data.page_width,
			viewport_height: data.viewport_height,
			kv_skin: context.get('targeting.skin'),
			kv_pos: SlotTracker.getPosParameter(slot.getTargeting().pos),
			kv_rv: slot.getTargeting().rv,
			kv_lang: context.get('targeting.lang'),
			kv_s0: 'gaming',
			kv_s1: context.get('wiki.wgDBname'),
			kv_s2: context.get('targeting.s2'),
			kv_s0v: context.get('targeting.s0v'),
			kv_esrb: context.get('targeting.esrb'),
			kv_ref: context.get('targeting.ref'),
			kv_ah: window.document.body.scrollHeight,
			labrador: utils.geoService.getSamplingResults().join(';'),
			opt_in: optIn && cmpWrapper.geoRequiresConsent(country) ? userConsented : '',
			bidder_won: slot.winningBidderDetails ? slot.winningBidderDetails.name : '',
			bidder_won_price: slot.winningBidderDetails ? slot.winningBidderDetails.price.toString() : '',
			scroll_y: window.scrollY || window.pageYOffset,
			page_layout: `pos_top=${slot.getTopOffset()}`,
			document_visibility: utils.getDocumentVisibilityStatus(),
		};
	}

	/**
	 * Get slot position from slot targeting
	 */
	private static getPosParameter(pos: string | string[] = ''): string {
		return (Array.isArray(pos) ? pos : pos.split(','))[0].toLowerCase();
	}

	/**
	 * Track custom slot event to data warehouse
	 */
	onCustomEvent(adSlot: AdSlot, data: AdSlotData): void {
		const dataWarehouseTracker = new DataWarehouseTracker();

		// @ts-ignore TODO: Remove, wf ADEN-8825
		dataWarehouseTracker.track(SlotTracker.prepareData(adSlot, data), slotTrackingURL);
	}

	/**
	 * Track render ended event to data warehouse
	 */
	onRenderEnded(adSlot: AdSlot, data: AdSlotData): void {
		const dataWarehouseTracker = new DataWarehouseTracker();

		// @ts-ignore TODO: Remove, wf ADEN-8825
		dataWarehouseTracker.track(SlotTracker.prepareData(adSlot, data), slotTrackingURL);
	}

	/**
	 * Track status changed event (other than success and collapse) to data warehouse
	 */
	onStatusChanged(adSlot: AdSlot, data: AdSlotData): void {
		const status = adSlot.getStatus();
		const dataWarehouseTracker = new DataWarehouseTracker();

		if (onChangeStatusToTrack.indexOf(status) !== -1) {
			// @ts-ignore TODO: Remove, wf ADEN-8825
			dataWarehouseTracker.track(SlotTracker.prepareData(adSlot, data), slotTrackingURL);
		}
	}
}
