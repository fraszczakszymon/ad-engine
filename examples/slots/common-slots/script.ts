import { slotBiddersTracking } from '@wikia/ad-bidders';
import {
	AdEngine,
	AdSlot,
	context,
	eventService,
	slotInfoTracking,
	slotService,
} from '@wikia/ad-engine';
import { SLOT_TRACKING_EVENT, slotGeneralTracking, slotTracker } from '@wikia/ad-tracking';
import customContext from '../../context';
import '../../styles.scss';

context.extend(customContext);
context.set('slots.bottom_leaderboard.disabled', false);

slotService.on('top_leaderboard', AdSlot.STATUS_SUCCESS, () => {
	console.info('top_leaderboard succeed');
});

// Register slot tracker
slotTracker
	.addMiddleware(slotGeneralTracking)
	.addMiddleware(slotInfoTracking)
	.addMiddleware(slotBiddersTracking)
	.register();

// Execute command on slot status (e.g. trigger tracking)
eventService.on(SLOT_TRACKING_EVENT, (data) => {
	console.info(`🏁 ${data.kv_pos} ${data.ad_status}`);
	console.dir(data);
});

new AdEngine().init();
