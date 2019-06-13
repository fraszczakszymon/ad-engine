import { AdSlot, context, eventService, utils } from '@wikia/ad-engine';

export interface AdInfoContext {
	data: any;
	slot: AdSlot;
}

class SlotTracker {
	onRenderEndedStatusToTrack = [AdSlot.STATUS_COLLAPSE, AdSlot.STATUS_SUCCESS];
	onChangeStatusToTrack = [
		AdSlot.STATUS_BLOCKED,
		AdSlot.STATUS_ERROR,
		AdSlot.STATUS_VIEWPORT_CONFLICT,
	];
	middlewareService = new utils.MiddlewareService();

	add(middleware: utils.Middleware<AdInfoContext>): this {
		this.middlewareService.add(middleware);

		return this;
	}

	isEnabled(): boolean {
		return context.get('options.tracking.slot.status');
	}

	register(callback: utils.Middleware<AdInfoContext>): void {
		if (!this.isEnabled()) {
			return;
		}

		eventService.on(AdSlot.SLOT_RENDERED_EVENT, (slot: AdSlot) => {
			const status = slot.getStatus();

			if (
				this.onRenderEndedStatusToTrack.indexOf(status) !== -1 ||
				slot.getConfigProperty('trackEachStatus')
			) {
				this.middlewareService.execute(
					{
						data: {},
						slot,
					},
					callback,
				);
			} else if (slot.getStatus() === 'manual') {
				slot.trackOnStatusChanged = true;
			}
		});

		eventService.on(AdSlot.SLOT_STATUS_CHANGED, (slot: AdSlot) => {
			const status = slot.getStatus();
			const shouldSlotBeTracked =
				slot.getConfigProperty('trackEachStatus') || slot.trackOnStatusChanged;

			if (this.onChangeStatusToTrack.indexOf(status) !== -1 || shouldSlotBeTracked) {
				this.middlewareService.execute(
					{
						data: {},
						slot,
					},
					callback,
				);
				delete slot.trackOnStatusChanged;
			}
		});

		eventService.on(AdSlot.CUSTOM_EVENT, (slot: AdSlot, { status }) => {
			this.middlewareService.execute(
				{
					data: {
						ad_status: status,
					},
					slot,
				},
				callback,
			);
		});
	}
}

export const slotTracker = new SlotTracker();
