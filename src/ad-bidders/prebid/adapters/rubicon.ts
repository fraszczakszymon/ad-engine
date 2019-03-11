import { context } from '@wikia/ad-engine';
import { getTargeting } from '../prebid-helper';
import { AdUnitConfig, BaseAdapter } from './base-adapter';

export class Rubicon extends BaseAdapter {
	static bidderName = 'rubicon';
	accountId: number;

	constructor(options) {
		super(options);

		this.accountId = options.accountId;
	}

	get bidderName(): string {
		return Rubicon.bidderName;
	}

	prepareConfigForAdUnit(code, { siteId, zoneId, sizeId, position }): AdUnitConfig {
		if (code === 'featured' && !context.get('custom.rubiconInFV')) {
			return null;
		}

		const targeting = getTargeting(code);

		return {
			code,
			mediaType: 'video',
			mediaTypes: {
				video: {
					playerSize: [640, 480],
					context: 'instream',
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
						inventory: targeting,
						video: {
							playerWidth: '640',
							playerHeight: '480',
							size_id: sizeId,
							language: targeting.lang ? targeting.lang[0] : 'en',
						},
					},
				},
			],
		};
	}
}
