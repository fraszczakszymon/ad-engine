import { AdUnitConfig, BaseAdapter } from './base-adapter';

export class Openx extends BaseAdapter {
	static bidderName = 'openx';
	delDomain: string;

	constructor(options) {
		super(options);

		this.delDomain = options.delDomain;
	}

	get bidderName(): string {
		return Openx.bidderName;
	}

	prepareConfigForAdUnit(code, { sizes, unit }): AdUnitConfig {
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
						unit,
						delDomain: this.delDomain,
					},
				},
			],
		};
	}
}
