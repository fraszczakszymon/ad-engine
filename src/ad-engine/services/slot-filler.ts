import { AdSlot, Dictionary } from '../models';

export interface SlotFiller {
	getName: () => string;
	fill: (adSlot: AdSlot) => void;
}

class SlotFillers {
	fillers: Dictionary<SlotFiller> = {};

	register(filler: SlotFiller) {
		const fillerName = filler.getName();

		this.fillers[fillerName] = filler;
	}

	apply(adSlot: AdSlot, fillerName: string) {
		this.fillers[fillerName].fill(adSlot);
	}

}
export const slotFillers = new SlotFillers();