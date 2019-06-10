import { AdSlot } from '@wikia/ad-engine';
import { bidders } from '../';
import {
	TrackingCallback,
	TrackingData,
	TrackingMiddleware,
} from '../../ad-tracking/slot-tracking-middleware';

function getBiddersPrices(slotName) {
	const realSlotPrices = bidders.getDfpSlotPrices(slotName);
	const currentSlotPrices = bidders.getCurrentSlotPrices(slotName);

	function transformBidderPrice(bidderName) {
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
		bidder_5: transformBidderPrice('vmg'),
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
		bidder_18: transformBidderPrice('lkqd'),
	};
}

export const slotBiddersTracking: TrackingMiddleware = (next: TrackingCallback) => (
	data: TrackingData,
	slot: AdSlot,
): void => {
	return next(
		{
			...data,

			bidder_won: slot.winningBidderDetails ? slot.winningBidderDetails.name : '',
			bidder_won_price: slot.winningBidderDetails ? slot.winningBidderDetails.price : '',
			...getBiddersPrices(slot.getSlotName()),
		},
		slot,
	);
};
