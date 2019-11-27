import { PrebidAdapter } from '../prebid-adapter';

export class Criteo extends PrebidAdapter {
	static bidderName = 'criteo';
	aliases = {
		criteo: [Criteo.bidderName],
	};

	networkId: string;

	get bidderName(): string {
		return Criteo.bidderName;
	}

	prepareConfigForAdUnit(code, { sizes, networkId }): PrebidAdUnit {
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
					networkId,
					size,
				},
			})),
		};
	}
}
