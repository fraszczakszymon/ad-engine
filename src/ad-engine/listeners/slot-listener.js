import { logger, client } from '../utils';
import { AdSlot } from '../models';
import { context, slotTweaker, slotDataParamsUpdater, slotInjector } from '../services';

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

function getData(adSlot, { adType }) {
	return {
		browser: `${client.getOperatingSystem()} ${client.getBrowser()}`,
		adType: adType || '',
		creative_id: adSlot.creativeId,
		creative_size: adSlot.creativeSize,
		line_item_id: adSlot.lineItemId,
		status: adSlot.getStatus(),
		page_width: window.document.body.scrollWidth || '',
		time_bucket: (new Date()).getHours(),
		timestamp: new Date().getTime(),
		viewport_height: window.innerHeight || 0
	};
}

function dispatch(methodName, adSlot, adInfo = {}) {
	if (!listeners) {
		listeners = context.get('listeners.slot').filter(listener => !listener.isEnabled || listener.isEnabled());
	}

	const data = getData(adSlot, adInfo);

	listeners.forEach((listener) => {
		if (typeof listener[methodName] !== 'function') {
			return;
		}

		listener[methodName](adSlot, data);
	});
	logger(logGroup, methodName, adSlot, adInfo, data);
}

class SlotListener {
	emitRenderEnded(event, adSlot) {
		const adType = getAdType(event, adSlot);

		slotDataParamsUpdater.updateOnRenderEnd(adSlot, event);
		if (event) {
			if (event.slot) {
				const response = event.slot.getResponseInformation();

				if (response) {
					adSlot.creativeId = response.creativeId;
					adSlot.lineItemId = response.lineItemId;
				}
			}

			if (event.size && event.size.length) {
				adSlot.creativeSize = event.size.join('x');
			}
		}

		switch (adType) {
			case 'collapse':
				adSlot.collapse();
				break;
			case 'manual':
				break;
			default:
				adSlot.success();
				break;
		}

		const slotsToPush = context.get(`events.pushAfterRendered.${adSlot.getSlotName()}`);
		if (slotsToPush) {
			slotsToPush.forEach((slotName) => {
				slotInjector.inject(slotName);
			});
		}

		dispatch('onRenderEnded', adSlot, { adType, event });
	}

	emitImpressionViewable(event, adSlot) {
		adSlot.emit(AdSlot.SLOT_VIEWED_EVENT);
		dispatch('onImpressionViewable', adSlot);
		slotTweaker.setDataParam(adSlot, 'slotViewed', true);
	}

	emitStatusChanged(adSlot) {
		slotTweaker.setDataParam(adSlot, 'slotResult', adSlot.getStatus());
		dispatch('onStatusChanged', adSlot);
	}
}

export const slotListener = new SlotListener();
