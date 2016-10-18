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

function buildAdUnitId(src, slotName) {
	if (src && slotName) {
		return StringBuilder.build(Context.get('vast.adUnitId'), { src, slotName });
	}

	return Context.get('vast.defaultAdUnitId');
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export default class VastUrlBuilder {
	static build(src, slotName, aspectRatio) {
		const params = [
			'output=vast',
			'env=vp',
			'gdfp_req=1',
			'impl=s',
			'unviewed_position_start=1',
			`iu=${buildAdUnitId(src, slotName)}`,
			`sz=${(aspectRatio > 1 || !isNumeric(aspectRatio) ? '640x480' : '320x480')}`,
			`url=${window.location.href}`,
			`correlator=${correlator}`,
			`cust_params=${getCustomParameters({ src, pos: slotName })}`
		];

		return baseUrl + params.join('&');
	}
}
