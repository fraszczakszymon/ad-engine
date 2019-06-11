import { slotBiddersTrackingMiddleware } from '@wikia/ad-bidders';
import {
	AdEngine,
	AdSlot,
	context,
	eventService,
	slotPropertiesTrackingMiddleware,
	slotService,
	viewabilityPropertiesTrackingMiddleware,
} from '@wikia/ad-engine';
import { slotBillTheLizardStatusTrackingMiddleware } from '@wikia/ad-services';
import {
	slotTracker,
	slotTrackingMiddleware,
	viewabilityTracker,
	viewabilityTrackingMiddleware,
} from '@wikia/ad-tracking';
import customContext from '../../context';
import '../../styles.scss';

context.extend(customContext);
context.set('slots.bottom_leaderboard.disabled', false);
context.set('options.tracking.kikimora.slot', true);
context.set('options.tracking.kikimora.viewability', true);

slotService.on('top_leaderboard', AdSlot.STATUS_SUCCESS, () => {
	console.info('top_leaderboard succeed');
});

// Register slot tracker
slotTracker
	.addMiddleware(slotTrackingMiddleware)
	.addMiddleware(slotPropertiesTrackingMiddleware)
	.addMiddleware(slotBiddersTrackingMiddleware)
	.addMiddleware(slotBillTheLizardStatusTrackingMiddleware)
	.register((data) => {
		// Trigger event tracking
		console.info(`🏁 Slot tracker: ${data.kv_pos} ${data.ad_status}`, data);
	});

viewabilityTracker
	.addMiddleware(viewabilityTrackingMiddleware)
	.addMiddleware(viewabilityPropertiesTrackingMiddleware)
	.register((data) => {
		// Trigger event tracking
		console.info(`👀 Viewability tracker: ${data.line_item_id} ${data.creative_id}`, data);
	});

new AdEngine().init();
