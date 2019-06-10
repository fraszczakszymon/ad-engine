import { AdSlot, context, eventService, utils } from '@wikia/ad-engine';
import { TrackingCallback } from './slot-tracking-middleware';

class ViewabilityTracker extends utils.MiddlewareChain {
	isEnabled(): boolean {
		return context.get('options.tracking.kikimora.viewability');
	}

	register(callback: TrackingCallback): void {
		if (!this.isEnabled()) {
			return;
		}

		eventService.on(AdSlot.SLOT_VIEWED_EVENT, (slot: AdSlot) => {
			this.resolve(callback, {}, slot);
		});
	}
}

export const viewabilityTracker = new ViewabilityTracker();
