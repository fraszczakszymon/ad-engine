import SlotTweaker from "./slot-tweaker";
import Context from "./context-service";

export default {
	getSlotSizes(adSlot) {
		let result = {};

		adSlot.getSizes()
			.forEach((s) => {
				result[s.viewportSize[0] + 'x' + s.viewportSize[1]] = s.sizes
			});

		return JSON.stringify(result);
	},

	updateOnCreate(adSlot) {
		SlotTweaker.setDataParam(adSlot, 'gptPageParams', Context.get('targeting'));
		SlotTweaker.setDataParam(adSlot, 'gptSlotParams', adSlot.config.targeting);
		SlotTweaker.setDataParam(adSlot, 'sizes', this.getSlotSizes(adSlot));
	},

	updateOnRenderEnd(adSlot, event) {
		SlotTweaker.setDataParam(adSlot, 'gptLineItemId', event.lineItemId);
		SlotTweaker.setDataParam(adSlot, 'gptCreativeId', event.creativeId);
		SlotTweaker.setDataParam(adSlot, 'gptCreativeSize', event.size);
	}
};
