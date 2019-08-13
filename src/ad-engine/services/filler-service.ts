import { AdSlot, Dictionary } from '../models';

export interface SlotFiller {
	fill: (adSlot: AdSlot) => void;
	getContainer: () => HTMLElement;
	getName: () => string;
}

class FillerService {
	fillers: Dictionary<SlotFiller> = {};

	apply(adSlot: AdSlot, fillerName: string): void {
		this.fillers[fillerName].fill(adSlot);
	}

	get(fillerName: string): SlotFiller {
		return this.fillers[fillerName];
	}

	register(filler: SlotFiller): void {
		const fillerName = filler.getName();

		this.fillers[fillerName] = filler;
	}
}
export const fillerService = new FillerService();
