import { slotTweaker } from './slot-tweaker';
import { context } from './context-service';

class SlotDataParamsUpdater {
	getSlotSizes(adSlot) {
		const result = {};

		adSlot.getSizes()
			.forEach((s) => {
				result[`${s.viewportSize[0]}x${s.viewportSize[1]}`] = s.sizes;
			});

		return JSON.stringify(result);
	}

	updateOnCreate(adSlot, targeting) {
		slotTweaker.setDataParam(adSlot, 'gptPageParams', context.get('targeting'));
		slotTweaker.setDataParam(adSlot, 'gptSlotParams', targeting);
		slotTweaker.setDataParam(adSlot, 'sizes', this.getSlotSizes(adSlot));
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
