import { AdSlot, context, utils } from '@wikia/ad-engine';
import { TrackingData } from './slot-tracking-middleware';

function checkOptIn(): string {
	if (context.get('options.geoRequiresConsent')) {
		return context.get('options.trackingOptIn') ? 'yes' : 'no';
	}

	return '';
}

export function slotGeneralTracking(data: TrackingData, slot: AdSlot): TrackingData {
	const now = new Date();
	const timestamp = now.getTime();
	const keyVals = {
		likho: (context.get('targeting.likho') || []).join('|'),
	};

	return {
		...data,

		timestamp,
		browser: `${utils.client.getOperatingSystem()} ${utils.client.getBrowser()}`,
		country: (utils.geoService.getCountryCode() || '').toUpperCase(),
		device: utils.client.getDeviceType(),
		document_visibility: utils.getDocumentVisibilityStatus(),
		key_vals: Object.keys(keyVals)
			.filter((key) => keyVals[key])
			.map((key) => `${key}=${keyVals[key]}`)
			.join(';'),
		kv_ah: window.document.body.scrollHeight,
		kv_esrb: context.get('targeting.esrb') || '',
		kv_lang: context.get('targeting.lang') || '',
		kv_ref: context.get('targeting.ref') || '',
		kv_rv: slot.getTargeting().rv || '',
		kv_s0: context.get('targeting.s0') || '',
		kv_s0v: context.get('targeting.s0v') || '',
		kv_s1: context.get('targeting.s1') || '',
		kv_s2: context.get('targeting.s2') || '',
		kv_skin: context.get('targeting.skin') || '',
		kv_wsi: slot.getTargeting().wsi || '',
		kv_top: context.get('targeting.top') || '',
		labrador: utils.geoService.getSamplingResults().join(';'),
		opt_in: checkOptIn(),
		page_layout: `pos_top=${slot.getTopOffset()}`,
		page_width: window.document.body.scrollWidth || '',
		pv: window.pvNumber || '',
		pv_unique_id: window.pvUID || '',
		scroll_y: window.scrollY || window.pageYOffset,
		time_bucket: now.getHours(),
		tz_offset: now.getTimezoneOffset(),
		viewport_height: window.innerHeight || 0,
	};
}
