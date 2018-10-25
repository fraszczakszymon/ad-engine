import { GptSizeMap } from '../providers';
import { slotTweaker } from './slot-tweaker';
import { context } from './context-service';

class SlotDataParamsUpdater {
	updateOnCreate(adSlot, targeting) {
		const sizes = adSlot.isOutOfPage() ? 'out-of-page' : new GptSizeMap(adSlot.getSizes()).toString();

		slotTweaker.setDataParam(adSlot, 'gptPageParams', context.get('targeting'));
		slotTweaker.setDataParam(adSlot, 'gptSlotParams', targeting);
		slotTweaker.setDataParam(adSlot, 'sizes', sizes);
	}

	updateOnRenderEnd(adSlot, event) {
		if (event) {
			slotTweaker.setDataParam(adSlot, 'gptLineItemId', event.lineItemId);
			slotTweaker.setDataParam(adSlot, 'gptCreativeId', event.creativeId);
			slotTweaker.setDataParam(adSlot, 'gptCreativeSize', adSlot.isOutOfPage() ? 'out-of-page' : event.size);
		}
	}
}

export const slotDataParamsUpdater = new SlotDataParamsUpdater();
