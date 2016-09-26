'use strict';

import Context from '../services/context-service';
import StringBuilder from '../utils/string-builder';

const baseUrl = 'https://pubads.g.doubleclick.net/gampad/ads?',
	correlator = Math.round(Math.random() * 10000000000);

function getCustomParameters() {
	const pageLevelParams = Context.get('targeting'),
		customParameters = [];

	Object.keys(pageLevelParams).forEach(function (key) {
		if (pageLevelParams[key]) {
			customParameters.push(key + '=' + pageLevelParams[key]);
		}
	});

	return encodeURIComponent(customParameters.join('&'));
}

function buildAdUnitId(src, slotName) {
	if (src && slotName) {
		return StringBuilder.build(Context.get('vast.adUnitId'), {src: src, slotName: slotName});
	}

	return Context.get('vast.defaultAdUnitId');
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export default class VastBuilder {
	static build(src, slotName, aspectRatio) {
		var params = [
			'output=vast',
			'env=vp',
			'gdfp_req=1',
			'impl=s',
			'unviewed_position_start=1',
			'iu=' + buildAdUnitId(src, slotName),
			'sz=' + (aspectRatio > 1 || !isNumeric(aspectRatio) ? '640x480' : '320x480'),
			'url=' + location.href,
			'correlator=' + correlator,
			'cust_params=' + getCustomParameters()
		];

		return baseUrl + params.join('&');
	}
}
