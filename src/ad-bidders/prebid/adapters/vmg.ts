import { AdUnitConfig, BaseAdapter, BidderAdSlotConfig } from './base-adapter';

export class Vmg extends BaseAdapter {
	bidderName = 'vmg';

	prepareConfigForAdUnit(code: string, { sizes }: BidderAdSlotConfig): AdUnitConfig {
		return {
			code,
			mediaTypes: {
				banner: {
					sizes,
				},
			},
			bids: [
				{
					bidder: this.bidderName,
				},
			],
		};
	}
}
