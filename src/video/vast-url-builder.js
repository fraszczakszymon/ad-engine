import Context from '../services/context-service';
import StringBuilder from '../utils/string-builder';

const baseUrl = 'https://pubads.g.doubleclick.net/gampad/ads?',
	correlator = Math.round(Math.random() * 10000000000);

function getCustomParameters(slotLevelParams) {
	const params = Object.assign({}, Context.get('targeting'), slotLevelParams);

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

export default class VastUrlBuilder {
	static build(aspectRatio, slotParams = {}) {
		const params = [
			'output=vast',
			'env=vp',
			'gdfp_req=1',
			'impl=s',
			'unviewed_position_start=1',
			`iu=${buildAdUnitId(slotParams)}`,
			`sz=${(aspectRatio > 1 || !isNumeric(aspectRatio) ? '640x480' : '320x480')}`,
			`url=${window.location.href}`,
			`correlator=${correlator}`,
			`cust_params=${getCustomParameters(slotParams)}`
		];

		return baseUrl + params.join('&');
	}
}
