import { AdSlot, context, eventService, Middleware, MiddlewareService } from '@ad-engine/core';

export interface AdViewabilityContext {
	data: any;
	slot: AdSlot;
}

class ViewabilityTracker {
	private middlewareService = new MiddlewareService<AdViewabilityContext>();

	add(middleware: Middleware<AdViewabilityContext>): this {
		this.middlewareService.add(middleware);

		return this;
	}

	isEnabled(): boolean {
		return context.get('options.tracking.slot.viewability');
	}

	register(callback: Middleware<AdViewabilityContext>): void {
		if (!this.isEnabled()) {
			return;
		}

		eventService.on(AdSlot.SLOT_VIEWED_EVENT, (slot: AdSlot) => {
			this.middlewareService.execute(
				{
					slot,
					data: {},
				},
				callback,
			);
		});
	}
}

export const viewabilityTracker = new ViewabilityTracker();
