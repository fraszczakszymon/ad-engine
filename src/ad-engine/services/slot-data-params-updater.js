import { GptSizeMap } from '../providers/index';
import { slotTweaker } from './slot-tweaker';
import { context } from './context-service';

class SlotDataParamsUpdater {
	updateOnCreate(adSlot, targeting) {
		slotTweaker.setDataParam(adSlot, 'gptPageParams', context.get('targeting'));
		slotTweaker.setDataParam(adSlot, 'gptSlotParams', targeting);
		slotTweaker.setDataParam(adSlot, 'sizes', new GptSizeMap(adSlot.getSizes()).toString());
	}

	updateOnRenderEnd(adSlot, event) {
		if (event) {
			slotTweaker.setDataParam(adSlot, 'gptLineItemId', event.lineItemId);
			slotTweaker.setDataParam(adSlot, 'gptCreativeId', event.creativeId);
			slotTweaker.setDataParam(adSlot, 'gptCreativeSize', event.size);
		}
	}
}

export const slotDataParamsUpdater = new SlotDataParamsUpdater();
