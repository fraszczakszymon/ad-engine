import { AdUnitConfig, BaseAdapter } from './base-adapter';

export class IndexExchange extends BaseAdapter {
	static bidderName = 'indexExchange';
	aliases: { [key: string]: string[] };

	constructor(options) {
		super(options);

		this.aliases = {
			ix: [this.bidderName],
		};
	}

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
