import { PrebidAdapter } from '../prebid-adapter';

export class Criteo extends PrebidAdapter {
	static bidderName = 'criteo';

	networkId: string;

	get bidderName(): string {
		return Criteo.bidderName;
	}

	prepareConfigForAdUnit(code, { sizes, ids }): PrebidAdUnit {
		switch (code.toLowerCase()) {
			case 'featured':
			case 'incontent_player':
				return this.getVideoConfig(code, ids);
			default:
				return this.getStandardConfig(code, sizes, ids);
		}
	}

	getVideoConfig(code, ids): PrebidAdUnit {
		return {
			code,
			mediaTypes: {
				video: {
					playerSize: [640, 480],
					context: 'instream',
				},
			},
			bids: this.getBids(ids),
		};
	}

	getStandardConfig(code, { sizes, networkId }): PrebidAdUnit {
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

	getBids(ids, params = {}): PrebidBid[] {
		return ids.map((adSlot) => ({
			bidder: this.bidderName,
			params: {
				adSlot,
				publisherId: this.publisherId,
				...params,
			},
		}));
	}
}
