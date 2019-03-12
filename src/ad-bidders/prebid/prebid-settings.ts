import { context } from '@wikia/ad-engine';
import * as adapters from './adapters';
import { transformPriceFromBid } from './price-helper';

/**
 * @deprecated
 */
const dfpVideoBidders = [
	{ bidderCode: 'appnexusAst', contextKey: 'custom.appnexusDfp' },
	{ bidderCode: 'beachfront', contextKey: 'custom.beachfrontDfp' },
	{ bidderCode: 'lkqd', contextKey: 'custom.lkqdDfp' },
	{ bidderCode: 'rubicon', contextKey: 'custom.rubiconDfp' },
	{ bidderCode: 'pubmatic', contextKey: 'custom.pubmaticDfp' },
];
const videoType = 'video';

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

function getBidderUuid(bidResponse): string {
	if (context.get('bidders.prebid.useBuiltInTargetingLogic')) {
		const isVideoType = bidResponse.mediaType === videoType;

		if (isVideoType) {
			return bidResponse.videoCacheKey;
		}
	} else {
		const isVideoBidder = dfpVideoBidders.some(
			(video) => bidResponse.bidderCode === video.bidderCode && context.get(video.contextKey),
		);

		return isVideoBidder ? bidResponse.videoCacheKey : 'disabled';
	}
}

export function getSettings(): PrebidSettings {
	return {
		standard: {
			alwaysUseBid: true,
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
				{
					key: 'hb_uuid',
					val: (bidResponse) => getBidderUuid(bidResponse),
				},
			],
			suppressEmptyKeys: true,
		},
		...createAdServerTargetingForDeals(),
	};
}
