import { BaseAdapter } from './base-adapter';

export class Vmg extends BaseAdapter {
	constructor(options) {
		super(options);

		this.bidderName = 'vmg';
	}

	prepareConfigForAdUnit(code, { sizes }) {
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
