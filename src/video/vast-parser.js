import { queryString } from '../utils';

class VastParser {
	getAdInfo(imaAd) {
		const adInfo = {};

		let wrapperCreativeIds,
			wrapperIds;

		if (imaAd) {
			adInfo.lineItemId = imaAd.getAdId();
			adInfo.creativeId = imaAd.getCreativeId();
			adInfo.contentType = imaAd.getContentType();

			wrapperIds = imaAd.getWrapperAdIds();
			if (wrapperIds && wrapperIds.length) {
				adInfo.lineItemId = wrapperIds[0];
			}

			wrapperCreativeIds = imaAd.getWrapperCreativeIds();
			if (wrapperCreativeIds && wrapperCreativeIds.length) {
				adInfo.creativeId = wrapperCreativeIds[0];
			}
		}

		return adInfo;
	}

	parse(vastUrl, extra = {}) {
		const currentAd = this.getAdInfo(extra.imaAd),
			vastParams = queryString.getValues(vastUrl.substr(1 + vastUrl.indexOf('?'))),
			customParams = queryString.getValues(encodeURI(vastParams.cust_params));

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

export const vastParser = new VastParser();
