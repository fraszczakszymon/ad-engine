import { context, slotService, trackingOptIn } from '../services';

const availableVideoPositions = ['preroll', 'midroll', 'postroll'],
	baseUrl = 'https://pubads.g.doubleclick.net/gampad/ads?',
	correlator = Math.round(Math.random() * 10000000000);

function getCustomParameters(slot, extraTargeting = {}) {
	const params = Object.assign({}, context.get('targeting'), slot.getTargeting(), extraTargeting);

	return encodeURIComponent(
		Object.keys(params)
			.filter(key => params[key])
			.map(key => `${key}=${params[key]}`)
			.join('&')
	);
}

export function buildVastUrl(aspectRatio, slotName, options = {}) {
	const params = [
			'output=vast',
			'env=vp',
			'gdfp_req=1',
			'impl=s',
			'unviewed_position_start=1',
			'sz=640x480',
			`url=${encodeURIComponent(window.location.href)}`,
			`description_url=${encodeURIComponent(window.location.href)}`,
			`correlator=${correlator}`
		],
		slot = slotService.get(slotName);

	if (slot) {
		params.push(`iu=${slot.getVideoAdUnit()}`);
		params.push(`cust_params=${getCustomParameters(slot, options.targeting)}`);
	} else {
		throw Error('Slot does not exist!');
	}

	if (options.contentSourceId && options.videoId) {
		params.push(`cmsid=${options.contentSourceId}`);
		params.push(`vid=${options.videoId}`);
	}

	if (options.vpos && availableVideoPositions.indexOf(options.vpos) > -1) {
		params.push(`vpos=${options.vpos}`);
	}

	if (options.numberOfAds !== undefined) {
		params.push(`pmad=${options.numberOfAds}`);
	}

	params.push(`npa=${trackingOptIn.isOptedIn() ? 0 : 1}`);

	return baseUrl + params.join('&');
}
