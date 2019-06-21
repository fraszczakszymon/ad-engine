import { AdSlotData } from '@wikia/ad-engine';

export interface AdSlotTrackingData extends AdSlotData {
	pv_unique_id: string;
	pv: number;
	device: string;
	country: string;
	tz_offset: number;
	product_lineitem_id: number;
	slot_size: string;
	ad_status: string;
	kv_skin: string;
	kv_pos: string;
	kv_rv: number;
	kv_lang: string;
	kv_s0: string;
	kv_s1: string;
	kv_s2: string;
	kv_s0v: string;
	kv_esrb: string;
	kv_ref: string;
	kv_ah: number;
	labrador: string;
	opt_in: string;
	bidder_won: string;
	bidder_won_price: string;
	scroll_y: number;
	document_visibility: string;
	page_layout: string;
}
