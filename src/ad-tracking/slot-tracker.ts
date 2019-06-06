import { AdSlot, context, eventService } from '@wikia/ad-engine';
import { TrackingData, TrackingMiddleware } from './slot-tracking-middleware';

export const SLOT_TRACKING_EVENT = 'SLOT_TRACKING_EVENT';

class SlotTracker {
	onRenderEndedStatusToTrack = [AdSlot.STATUS_COLLAPSE, AdSlot.STATUS_SUCCESS];
	onChangeStatusToTrack = [
		AdSlot.STATUS_BLOCKED,
		AdSlot.STATUS_ERROR,
		AdSlot.STATUS_VIEWPORT_CONFLICT,
	];

	private middlewareList: TrackingMiddleware[] = [];

	isEnabled(): boolean {
		return context.get('options.tracking.kikimora.slot');
	}

	addMiddleware(middleware: TrackingMiddleware): SlotTracker {
		this.middlewareList.push(middleware);

		return this;
	}

	register(): void {
		if (!this.isEnabled()) {
			return;
		}

		eventService.on(AdSlot.SLOT_RENDERED_EVENT, (slot: AdSlot) => {
			const status = slot.getStatus();

			if (
				this.onRenderEndedStatusToTrack.indexOf(status) !== -1 ||
				slot.getConfigProperty('trackEachStatus')
			) {
				this.emitTrackingEvent(slot);
			} else if (slot.getStatus() === 'manual') {
				slot.trackOnStatusChanged = true;
			}
		});

		eventService.on(AdSlot.SLOT_STATUS_CHANGED, (slot: AdSlot) => {
			const status = slot.getStatus();
			const shouldSlotBeTracked =
				slot.getConfigProperty('trackEachStatus') || slot.trackOnStatusChanged;

			if (this.onChangeStatusToTrack.indexOf(status) !== -1 || shouldSlotBeTracked) {
				this.emitTrackingEvent(slot);
				delete slot.trackOnStatusChanged;
			}
		});
	}

	private getData(slot: AdSlot): TrackingData {
		let data = {};

		this.middlewareList.forEach((middleware: TrackingMiddleware) => {
			data = middleware(data, slot);
		});

		return data;
	}

	private emitTrackingEvent(slot: AdSlot): void {
		const data = this.getData(slot);

		eventService.emit(SLOT_TRACKING_EVENT, data);
	}
}

export const slotTracker = new SlotTracker();
