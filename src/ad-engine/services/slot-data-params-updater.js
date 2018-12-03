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

	updateOnRenderEnd(adSlot, creativeId, lineItemId, creativeSize) {
		slotTweaker.setDataParam(adSlot, 'gptCreativeId', creativeId);
		slotTweaker.setDataParam(adSlot, 'gptLineItemId', lineItemId);
		slotTweaker.setDataParam(adSlot, 'gptCreativeSize', creativeSize);
	}
}

export const slotDataParamsUpdater = new SlotDataParamsUpdater();
