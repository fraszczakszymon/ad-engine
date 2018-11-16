import { context } from '@wikia/ad-engine';
import { transformPriceFromCpm, DEFAULT_MAX_CPM } from './price-helper';

const videoBiddersCap50 = ['appnexusAst', 'rubicon', 'wikiaVideo']; // bidders with $50 cap

const dfpVideoBidders = [
	{ bidderCode: 'appnexusAst', contextKey: 'custom.appnexusDfp' },
	{ bidderCode: 'rubicon', contextKey: 'custom.rubiconDfp' },
];

export function getSettings() {
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
					val: (bidResponse) => {
						let maxCpm = DEFAULT_MAX_CPM;

						if (videoBiddersCap50.includes(bidResponse.bidderCode)) {
							maxCpm = 50;
						}

						return transformPriceFromCpm(bidResponse.cpm, maxCpm);
					},
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
		},
	};
}

function getBidderUuid(bidResponse) {
	const isVideo = dfpVideoBidders.some((video) => hasBidderCode(video, bidResponse));

	return isVideo ? bidResponse.videoCacheKey : 'disabled';
}

function hasBidderCode(video, bidResponse) {
	return bidResponse.bidderCode === video.bidderCode && context.get(video.contextKey);
}
