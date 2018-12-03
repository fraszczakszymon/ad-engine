import { queryString } from '../utils';

class VastParser {
	getAdInfo(imaAd) {
		const adInfo = {};

		if (imaAd) {
			adInfo.lineItemId = imaAd.getAdId();
			adInfo.creativeId = imaAd.getCreativeId();
			adInfo.contentType = imaAd.getContentType();

			const [lineItemId] = imaAd.getWrapperAdIds() || [];
			if (lineItemId !== undefined) {
				adInfo.lineItemId = lineItemId;
			}

			const [creativeId] = imaAd.getWrapperCreativeIds() || [];
			if (creativeId !== undefined) {
				adInfo.creativeId = creativeId;
			}
		}

		return adInfo;
	}

	parse(vastUrl, extra = {}) {
		const currentAd = this.getAdInfo(extra.imaAd);
		const vastParams = queryString.getValues(vastUrl.substr(1 + vastUrl.indexOf('?')));
		const customParams = queryString.getValues(encodeURI(vastParams.cust_params));

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
