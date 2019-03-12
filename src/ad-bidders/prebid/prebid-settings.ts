import { context } from '@wikia/ad-engine';
import * as adapters from './adapters';
import { transformPriceFromBid } from './price-helper';

type ValueFunction = (bidResponse: any) => string;

interface PrebidSettings {
	[key: string]: {
		alwaysUseBid?: boolean;
		adserverTargeting: {
			key: string;
			val: ValueFunction;
		}[];
		suppressEmptyKeys: boolean;
	};
}

export interface PrebidTargeting {
	hb_adid?: string;
	hb_bidder?: string;
	hb_pb?: string;
	hb_size?: string;
	[key: string]: string | string[];
}

function createAdServerTargetingForDeals(): PrebidSettings {
	const adaptersAdServerTargeting = {};

	if (!context.get('bidders.prebid.useBuiltInTargetingLogic')) {
		return;
	}

	Object.keys(adapters).forEach((key) => {
		const { bidderName } = adapters[key];

		adaptersAdServerTargeting[bidderName] = {
			adserverTargeting: [
				{
					key: `hb_deal_${bidderName}`,
					val: ({ dealId }) => {
						return dealId;
					},
				},
			],
			suppressEmptyKeys: true,
		};
	});

	return adaptersAdServerTargeting;
}

export function getSettings(): PrebidSettings {
	return {
		standard: {
			alwaysUseBid: false,
			adserverTargeting: [
				{
					key: 'hb_bidder',
					val: ({ bidderCode }) => bidderCode,
				},
				{
					key: 'hb_adid',
					val: ({ adId }) => adId,
				},
				{
					key: 'hb_pb',
					val: (bidResponse) => transformPriceFromBid(bidResponse),
				},
				{
					key: 'hb_size',
					val: ({ size }) => size,
				},
			],
			suppressEmptyKeys: true,
		},
		...createAdServerTargetingForDeals(),
	};
}
