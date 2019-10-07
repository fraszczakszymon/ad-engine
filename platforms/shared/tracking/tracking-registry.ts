import {
	Dictionary,
	eventService,
	playerEvents,
	porvataTracker,
	PostmessageTracker,
	slotBiddersTrackingMiddleware,
	slotPropertiesTrackingMiddleware,
	slotTracker,
	slotTrackingMiddleware,
	TrackingMessage,
	trackingPayloadValidationMiddleware,
	TrackingTarget,
	viewabilityPropertiesTrackingMiddleware,
	viewabilityTracker,
	viewabilityTrackingMiddleware,
} from '@wikia/ad-engine';
import { DataWarehouseTracker } from './data-warehouse';

const slotTrackingUrl = 'https://beacon.wikia-services.com/__track/special/adengadinfo';
const viewabilityUrl = 'https://beacon.wikia-services.com/__track/special/adengviewability';
const porvataUrl = 'https://beacon.wikia-services.com/__track/special/adengplayerinfo';

export class TrackingRegistry {
	registerTrackers(): void {
		this.porvataTracker();
		this.slotTracker();
		this.viewabilityTracker();
		this.postmessageTrackingTracker();
	}

	private porvataTracker(): void {
		const dataWarehouseTracker = new DataWarehouseTracker();

		eventService.on(playerEvents.VIDEO_PLAYER_TRACKING_EVENT, (data) => {
			dataWarehouseTracker.track(data, porvataUrl);
		});

		porvataTracker.register();
	}

	private slotTracker(): void {
		const dataWarehouseTracker = new DataWarehouseTracker();

		slotTracker.onChangeStatusToTrack.push('top-conflict');

		slotTracker
			.add(slotTrackingMiddleware)
			.add(slotPropertiesTrackingMiddleware)
			.add(slotBiddersTrackingMiddleware)
			.register(({ data }: Dictionary) => {
				dataWarehouseTracker.track(data, slotTrackingUrl);
			});
	}

	private viewabilityTracker(): void {
		const dataWarehouseTracker = new DataWarehouseTracker();

		viewabilityTracker
			.add(viewabilityTrackingMiddleware)
			.add(viewabilityPropertiesTrackingMiddleware)
			.register(({ data }: Dictionary) => {
				dataWarehouseTracker.track(data, viewabilityUrl);
			});
	}

	private postmessageTrackingTracker(): void {
		const postmessageTracker = new PostmessageTracker(['payload', 'target']);

		postmessageTracker
			.add(trackingPayloadValidationMiddleware)
			.register<TrackingMessage>((message) => {
				const { target, payload } = message;

				switch (target) {
					case TrackingTarget.GoogleAnalytics:
						window.ga(
							'tracker1.send',
							'event',
							payload.category,
							payload.action,
							payload.label,
							typeof payload.value === 'number' ? payload.value.toString() : payload.value,
						);
						break;
					case TrackingTarget.DataWarehouse:
						const dataWarehouseTracker = new DataWarehouseTracker();
						dataWarehouseTracker.track(payload);
						break;
					default:
						break;
				}
			});
	}
}
