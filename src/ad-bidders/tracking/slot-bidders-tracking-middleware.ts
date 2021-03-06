import { Dictionary, FuncPipelineStep } from '@ad-engine/core';
import { AdInfoContext } from '@ad-engine/tracking';
import { bidders } from '../';

async function getBiddersPrices(slotName: string): Promise<Dictionary<string>> {
	const realSlotPrices: Dictionary<string> = bidders.getDfpSlotPrices(slotName);
	const currentSlotPrices: Dictionary<string> = await bidders.getCurrentSlotPrices(slotName);

	function transformBidderPrice(bidderName: string): string {
		if (realSlotPrices && realSlotPrices[bidderName]) {
			return realSlotPrices[bidderName];
		}

		if (currentSlotPrices && currentSlotPrices[bidderName]) {
			return `${currentSlotPrices[bidderName]}not_used`;
		}

		return '';
	}

	return {
		bidder_0: transformBidderPrice('wikia'),
		bidder_1: transformBidderPrice('indexExchange'),
		bidder_2: transformBidderPrice('appnexus'),
		bidder_4: transformBidderPrice('rubicon'),
		bidder_6: transformBidderPrice('aol'),
		bidder_8: transformBidderPrice('wikiaVideo'),
		bidder_9: transformBidderPrice('openx'),
		bidder_10: transformBidderPrice('appnexusAst'),
		bidder_11: transformBidderPrice('rubicon_display'),
		bidder_12: transformBidderPrice('a9'),
		bidder_13: transformBidderPrice('onemobile'),
		bidder_14: transformBidderPrice('pubmatic'),
		bidder_15: transformBidderPrice('beachfront'),
		bidder_17: transformBidderPrice('kargo'),
		bidder_19: transformBidderPrice('gumgum'),
		bidder_20: transformBidderPrice('33across'),
		bidder_21: transformBidderPrice('triplelift'),
		bidder_23: transformBidderPrice('oneVideo'),
		bidder_25: transformBidderPrice('nobid'),
		bidder_26: transformBidderPrice('telaria'),
	};
}

export const slotBiddersTrackingMiddleware: FuncPipelineStep<AdInfoContext> = async (
	{ data, slot },
	next,
) => {
	return next({
		slot,
		data: {
			...data,

			bidder_won: slot.winningBidderDetails ? slot.winningBidderDetails.name : '',
			bidder_won_price: slot.winningBidderDetails ? slot.winningBidderDetails.price : '',
			...(await getBiddersPrices(slot.getSlotName())),
		},
	});
};
