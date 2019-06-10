import { AdSlot, context, eventService, utils } from '@wikia/ad-engine';
import { TrackingCallback } from './slot-tracking-middleware';

class SlotTracker extends utils.MiddlewareChain {
	onRenderEndedStatusToTrack = [AdSlot.STATUS_COLLAPSE, AdSlot.STATUS_SUCCESS];
	onChangeStatusToTrack = [
		AdSlot.STATUS_BLOCKED,
		AdSlot.STATUS_ERROR,
		AdSlot.STATUS_VIEWPORT_CONFLICT,
	];

	isEnabled(): boolean {
		return context.get('options.tracking.kikimora.slot');
	}

	register(callback: TrackingCallback): void {
		if (!this.isEnabled()) {
			return;
		}

		eventService.on(AdSlot.SLOT_RENDERED_EVENT, (slot: AdSlot) => {
			const status = slot.getStatus();

			if (
				this.onRenderEndedStatusToTrack.indexOf(status) !== -1 ||
				slot.getConfigProperty('trackEachStatus')
			) {
				this.resolve(callback, {}, slot);
			} else if (slot.getStatus() === 'manual') {
				slot.trackOnStatusChanged = true;
			}
		});

		eventService.on(AdSlot.SLOT_STATUS_CHANGED, (slot: AdSlot) => {
			const status = slot.getStatus();
			const shouldSlotBeTracked =
				slot.getConfigProperty('trackEachStatus') || slot.trackOnStatusChanged;

			if (this.onChangeStatusToTrack.indexOf(status) !== -1 || shouldSlotBeTracked) {
				this.resolve(callback, {}, slot);
				delete slot.trackOnStatusChanged;
			}
		});
	}
}

export const slotTracker = new SlotTracker();
