import { getTargeting } from '../prebid-helper';
import { AdUnitConfig, Aliases, BaseAdapter } from './base-adapter';

export class RubiconDisplay extends BaseAdapter {
	static bidderName = 'rubicon_display';
	accountId: number;
	aliases: Aliases;

	constructor(options) {
		super(options);

		this.aliases = {
			rubicon: [this.bidderName],
		};
		this.accountId = options.accountId;
	}

	get bidderName(): string {
		return RubiconDisplay.bidderName;
	}

	prepareConfigForAdUnit(code, { siteId, zoneId, sizes, position, targeting }): AdUnitConfig {
		const pageTargeting = getTargeting(code);

		Object.keys(targeting || {}).forEach((key) => {
			pageTargeting[key] = targeting[key];
		});

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
						position,
						siteId,
						zoneId,
						accountId: this.accountId,
						name: code,
						keywords: ['rp.fastlane'],
						inventory: pageTargeting,
					},
				},
			],
		};
	}
}
