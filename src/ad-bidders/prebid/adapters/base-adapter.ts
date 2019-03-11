export interface BidderAdSlotConfig {
	sizes: number[][];
}

export interface AdUnitConfig {
	code: string;
	mediaTypes: {
		banner?: {
			sizes: number[][];
		};
	};
	bids: Bid[];
}

export interface Bid {
	bidder: string;
}

export abstract class BaseAdapter {
	enabled: boolean;
	slots: boolean;

	constructor({ enabled, slots }) {
		this.enabled = enabled;
		this.slots = slots;
	}

	abstract prepareConfigForAdUnit(code: string, config: BidderAdSlotConfig): AdUnitConfig;

	prepareAdUnits(): AdUnitConfig[] {
		return Object.keys(this.slots).map((slotName) =>
			this.prepareConfigForAdUnit(slotName, this.slots[slotName]),
		);
	}
}
