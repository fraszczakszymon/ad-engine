import QueryString from '../utils/query-string';


export default class VastParser {
	static getAdInfo(imaAd) {
		const adInfo = {};

		let wrapperCreativeId,
			wrapperId;

		if (imaAd) {
			adInfo.lineItemId = imaAd.getAdId();
			adInfo.creativeId = imaAd.getCreativeId();
			adInfo.contentType = imaAd.getContentType();

			wrapperId = imaAd.getWrapperAdIds();
			if (wrapperId.length) {
				adInfo.lineItemId = wrapperId[0];
			}

			wrapperCreativeId = imaAd.getWrapperCreativeIds();
			if (wrapperCreativeId.length) {
				adInfo.creativeId = wrapperCreativeId[0];
			}
		}

		return adInfo;
	}

	static parse(vastUrl, extra = {}) {
		const currentAd = VastParser.getAdInfo(extra.imaAd),
			vastParams = QueryString.getValues(vastUrl.substr(1 + vastUrl.indexOf('?'))),
			customParams = QueryString.getValues(vastParams.cust_params);

		return {
			contentType: currentAd.contentType || extra.contentType,
			creativeId: currentAd.creativeId || extra.creativeId,
			customParams,
			lineItemId: currentAd.lineItemId || extra.lineItemId,
			position: vastParams.vpos,
			size: vastParams.sz
		};
	}
}
