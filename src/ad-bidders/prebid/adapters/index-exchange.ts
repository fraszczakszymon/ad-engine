import { AdUnitConfig, BaseAdapter } from './base-adapter';

export class IndexExchange extends BaseAdapter {
	static bidderName = 'indexExchange';
	static aliases = {
		ix: [IndexExchange.bidderName],
	};

	get bidderName(): string {
		return IndexExchange.bidderName;
	}

	prepareConfigForAdUnit(code, { sizes, siteId }): AdUnitConfig {
		return {
			code,
			mediaTypes: {
				banner: {
					sizes,
				},
			},
			bids: sizes.map((size) => ({
				bidder: this.bidderName,
				params: {
					siteId,
					size,
				},
			})),
		};
	}
}
