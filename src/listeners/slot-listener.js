import { logger } from '../utils/logger';
import { SLOT_VIEWED_EVENT } from '../models/ad-slot';
import Client from '../utils/client';
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

function getData({ adType, event }) {
	const data = {
		browser: `${Client.getOperatingSystem()} ${Client.getBrowser()}`,
		status: adType,
		page_width: window.document.body.scrollWidth || '',
		time_bucket: (new Date()).getHours(),
		viewport_height: window.innerHeight || 0
	};

	if (event) {
		if (event.slot) {
			const response = event.slot.getResponseInformation();

			data.creative_id = response.creativeId;
			data.line_item_id = response.lineItemId;
		}

		if (event.size && event.size.length) {
			data.creative_size = event.size.join('x');
		}
	}

	return data;
}

function dispatch(methodName, adSlot, adInfo = {}) {
	if (!listeners) {
		listeners = Context.get('listeners.slot').filter(listener => !listener.isEnabled || listener.isEnabled());
	}

	const data = getData(adInfo);

	listeners.forEach((listener) => {
		if (typeof listener[methodName] !== 'function') {
			return;
		}

		listener[methodName](adSlot, data);
	});
	logger(logGroup, methodName, adSlot, adInfo, data);
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

	static emitImpressionViewable(event, adSlot) {
		adSlot.emit(SLOT_VIEWED_EVENT);
		dispatch('onImpressionViewable', adSlot, { event });
		SlotTweaker.setDataParam(adSlot, 'slotViewed', true);
	}
}
