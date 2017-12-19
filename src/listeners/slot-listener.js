import { logger } from '../utils/logger';
import { SLOT_VIEWED_EVENT } from '../models/ad-slot';
import Context from '../services/context-service';
import SlotTweaker from '../services/slot-tweaker';
import SlotDataParamsUpdater from '../services/slot-data-params-updater';

const logGroup = 'slot-listener';

let listeners = null;

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

function dispatch(methodName, adSlot, data = {}) {
	if (!listeners) {
		listeners = Context.get('listeners.slot').filter(listener => !listener.isEnabled || listener.isEnabled());
	}

	listeners.forEach((listener) => {
		if (typeof listener[methodName] !== 'function') {
			return;
		}

		listener[methodName](adSlot, data);
	});
	logger(logGroup, methodName, adSlot, data);
}

export default class SlotListener {
	static emitRenderEnded(event, adSlot) {
		const adType = getAdType(event, adSlot);

		switch (adType) {
			case 'collapse':
				adSlot.collapse();
				break;
			default:
				adSlot.success();
				break;
		}

		dispatch('onRenderEnded', adSlot, { adType, event });
		SlotDataParamsUpdater.updateOnRenderEnd(adSlot, event);
	}

	static emitImpressionViewable(adSlot) {
		adSlot.emit(SLOT_VIEWED_EVENT);
		dispatch('onImpressionViewable', adSlot);
		SlotTweaker.setDataParam(adSlot, 'slotViewed', true);
	}
}
