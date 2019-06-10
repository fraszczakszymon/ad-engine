import { slotBiddersTrackingMiddleware } from '@wikia/ad-bidders';
import {
	AdEngine,
	AdSlot,
	context,
	eventService,
	slotPropertiesTrackingMiddleware,
	slotService,
} from '@wikia/ad-engine';
import { slotBillTheLizardStatusTrackingMiddleware } from '@wikia/ad-services';
import { slotTracker, slotTrackingMiddleware } from '@wikia/ad-tracking';
import customContext from '../../context';
import '../../styles.scss';

context.extend(customContext);
context.set('slots.bottom_leaderboard.disabled', false);
context.set('options.tracking.kikimora.slot', true);

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
		console.info(`🏁 ${data.kv_pos} ${data.ad_status}`);
		console.dir(data);
	});

new AdEngine().init();
