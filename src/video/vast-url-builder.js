import Context from '../services/context-service';
import SlotService from '../services/slot-service';
import StringBuilder from '../utils/string-builder';

const baseUrl = 'https://pubads.g.doubleclick.net/gampad/ads?',
	correlator = Math.round(Math.random() * 10000000000);

function getCustomParameters(slotLevelParams) {
	const slot = SlotService.getBySlotName(slotLevelParams.pos);
	const slotTargeting = slot ? slot.config.targeting : {};
	const wsiParam = slotTargeting.wsi ? { wsi: slotTargeting.wsi } : {};
	const params = Object.assign({}, Context.get('targeting'), slotLevelParams, wsiParam);

	return encodeURIComponent(
		Object.keys(params)
              .filter(key => params[key])
              .map(key => `${key}=${params[key]}`)
              .join('&')
	);
}

function buildAdUnitId(slotParams) {
	return StringBuilder.build(Context.get('vast.adUnitId'), { pos: slotParams.pos, src: slotParams.src });
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export function build(aspectRatio, slotParams = {}, options = {}) {
	const params = [
		'output=vast',
		'env=vp',
		'gdfp_req=1',
		'impl=s',
		'unviewed_position_start=1',
		`iu=${buildAdUnitId(slotParams)}`,
		`sz=${(aspectRatio > 1 || !isNumeric(aspectRatio) ? '640x480' : '320x480')}`,
		`url=${encodeURIComponent(window.location.href)}`,
		`description_url=${encodeURIComponent(window.location.href)}`,
		`correlator=${correlator}`,
		`cust_params=${getCustomParameters(slotParams)}`
	];

	if (options.contentSourceId && options.videoId) {
		params.push('cmsid=' + options.contentSourceId);
		params.push('vid=' + options.videoId);
	}

	if (options.numberOfAds !== undefined) {
		params.push('pmad=' + options.numberOfAds);
	}

	return baseUrl + params.join('&');
}
