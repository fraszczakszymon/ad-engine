import { context, events, eventService, utils } from '@ad-engine/core';
import { CommonBidDefinition } from '../bid';

export interface AdBidderContext {
	bid: CommonBidDefinition;
	data: any;
}

class BidderTracker {
	private middlewareService = new utils.MiddlewareService<AdBidderContext>();

	add(middleware: utils.Middleware<AdBidderContext>): this {
		this.middlewareService.add(middleware);

		return this;
	}

	isEnabled(): boolean {
		return context.get('options.tracking.slot.bidder');
	}

	register(callback: utils.Middleware<AdBidderContext>): void {
		if (!this.isEnabled()) {
			return;
		}

		eventService.on(events.BIDS_RESPONSE, (bid: CommonBidDefinition) => {
			this.middlewareService.execute(
				{
					bid,
					data: {},
				},
				callback,
			);
		});
	}
}

export const bidderTracker = new BidderTracker();
