import { AdUnitConfig, BaseAdapter } from './base-adapter';

export class Aol extends BaseAdapter {
	static bidderName = 'aol';
	network: string;

	constructor(options) {
		super(options);

		this.network = options.network;
	}

	get bidderName(): string {
		return Aol.bidderName;
	}

	prepareConfigForAdUnit(code, { sizes, placement, alias, sizeId }): AdUnitConfig {
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
					params: {
						alias,
						placement,
						sizeId,
						network: this.network,
					},
				},
			],
		};
	}
}
