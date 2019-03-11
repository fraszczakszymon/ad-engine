export interface BidderAdSlotConfig {
	appId?: string | number;
	placementId?: string | number;
	pos?: string;
	size?: number[];
	sizes?: number[][];
	siteId?: string | number;
	unit?: string;
}

export interface AdUnitConfig {
	bids: Bid[];
	code: string;
	mediaType?: string;
	mediaTypes?: {
		banner?: {
			sizes: number[][];
		};
		video?: {
			context?: string;
			playerSize: number[];
		};
	};
	sizes?: number[];
}

export interface Bid {
	bidder: string;
	params?: { [key: string]: string | number | object | boolean };
}

export abstract class BaseAdapter {
	enabled: boolean;
	slots: boolean;

	constructor({ enabled, slots }) {
		this.enabled = enabled;
		this.slots = slots;
	}

	abstract prepareConfigForAdUnit(code: string, config: BidderAdSlotConfig): AdUnitConfig;

	abstract get bidderName(): string;

	prepareAdUnits(): AdUnitConfig[] {
		return Object.keys(this.slots).map((slotName) =>
			this.prepareConfigForAdUnit(slotName, this.slots[slotName]),
		);
	}
}
