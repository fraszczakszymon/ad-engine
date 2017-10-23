import QueryString from '../utils/query-string';


export default class VastParser {
	static getAdInfo(imaAd) {
		const adInfo = {};

		let wrapperCreativeIds,
			wrapperIds;

		if (imaAd) {
			adInfo.lineItemId = imaAd.getAdId();
			adInfo.creativeId = imaAd.getCreativeId();
			adInfo.contentType = imaAd.getContentType();

			wrapperIds = imaAd.getWrapperAdIds();
			if (wrapperIds.length) {
				adInfo.lineItemId = wrapperIds[0];
			}

			wrapperCreativeIds = imaAd.getWrapperCreativeIds();
			if (wrapperCreativeIds.length) {
				adInfo.creativeId = wrapperCreativeIds[0];
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
