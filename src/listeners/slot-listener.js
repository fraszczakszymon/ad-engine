import { logger } from '../utils/logger';
import SlotTweaker from '../services/slot-tweaker';

const logGroup = 'slot-listener';

function getIframe(adSlot) {
	return document.getElementById(adSlot.getId()).querySelector('div[id*="_container_"] iframe');
}

function getAdType(event, adSlot) {
	const iframe = getIframe(adSlot);

	let isIframeAccessible = false;

	if (event.isEmpty) {
		return 'collapse';
	}

	try {
		isIframeAccessible = !!iframe.contentWindow.document.querySelector;
	} catch (e) {
		logger(logGroup, 'getAdType', 'iframe is not accessible');
	}

	if (isIframeAccessible && iframe.contentWindow.AdEngine_adType) {
		return iframe.contentWindow.AdEngine_adType;
	}

	return 'success';
}

export default class SlotListener {
	static onRenderEnded(event, adSlot) {
		const adType = getAdType(event, adSlot);

		logger(logGroup, 'onRenderEnded', adSlot.getId(), adType, event);
		SlotTweaker.updateDataParams(adSlot, event);

		switch (adType) {
			case 'collapse':
				adSlot.collapse();
				break;
			default:
				adSlot.success();
				break;
		}
	}

	static onImpressionViewable(adSlot) {
		SlotTweaker.setDataParam(adSlot, 'slotViewed', true);
	}
}
