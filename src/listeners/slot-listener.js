import { logger } from '../utils/logger';
import { SLOT_VIEWED_EVENT } from '../models/ad-slot';
import SlotTweaker from '../services/slot-tweaker';
import SlotDataParamsUpdater from '../services/slot-data-params-updater';

const logGroup = 'slot-listener';

function getIframe(adSlot) {
	return adSlot.getElement().querySelector('div[id*="_container_"] iframe');
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
	static emitRenderEnded(event, adSlot) {
		const adType = getAdType(event, adSlot);

		logger(logGroup, 'onRenderEnded', adSlot.getId(), adType, event);
		SlotDataParamsUpdater.updateOnRenderEnd(adSlot, event);

		switch (adType) {
			case 'collapse':
				adSlot.collapse();
				break;
			default:
				adSlot.success();
				break;
		}
	}

	static emitImpressionViewable(adSlot) {
		adSlot.emit(SLOT_VIEWED_EVENT);
		SlotTweaker.setDataParam(adSlot, 'slotViewed', true);
	}
}
