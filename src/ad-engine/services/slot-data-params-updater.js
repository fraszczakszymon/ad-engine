import { GptSizeMap } from '../providers';
import { slotTweaker } from './slot-tweaker';
import { context } from './context-service';

export const ADX = 'AdX';

class SlotDataParamsUpdater {
	updateOnCreate(adSlot, targeting) {
		const sizes = adSlot.isOutOfPage() ? 'out-of-page' : new GptSizeMap(adSlot.getSizes()).toString();

		slotTweaker.setDataParam(adSlot, 'gptPageParams', context.get('targeting'));
		slotTweaker.setDataParam(adSlot, 'gptSlotParams', targeting);
		slotTweaker.setDataParam(adSlot, 'sizes', sizes);
	}

	updateOnRenderEnd(adSlot, event) {
		if (event) {
			const resp = event.slot.getResponseInformation();
			if (resp && !resp.isEmpty && resp.creativeId === null && resp.lineItemId === null) {
				slotTweaker.setDataParam(adSlot, 'gptLineItemId', ADX);
				slotTweaker.setDataParam(adSlot, 'gptCreativeId', ADX);
			} else {
				slotTweaker.setDataParam(adSlot, 'gptLineItemId', event.lineItemId);
				slotTweaker.setDataParam(adSlot, 'gptCreativeId', event.creativeId);
			}
			slotTweaker.setDataParam(adSlot, 'gptCreativeSize', adSlot.isOutOfPage() ? 'out-of-page' : event.size);
		}
	}
}

export const slotDataParamsUpdater = new SlotDataParamsUpdater();
