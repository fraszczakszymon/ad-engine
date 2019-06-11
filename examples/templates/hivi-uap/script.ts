import {
	AdEngine,
	context,
	slotPropertiesTrackingMiddleware,
	templateService,
} from '@wikia/ad-engine';
import {
	BigFancyAdAbove,
	BigFancyAdBelow,
	FloatingRail,
	setupNpaContext,
} from '@wikia/ad-products';
import { slotTracker, slotTrackingMiddleware } from '@wikia/ad-tracking';
import customContext from '../../context';
import '../../styles.scss';

context.extend(customContext);
context.set('targeting.artid', '455');
context.set('options.tracking.kikimora.slot', true);

if (document.body.offsetWidth < 728) {
	context.set('state.isMobile', true);
	context.set('targeting.skin', 'fandom_mobile');
}

setupNpaContext();

templateService.register(BigFancyAdAbove);
templateService.register(BigFancyAdBelow);
templateService.register(FloatingRail);

// Register slot tracker
slotTracker
	.addMiddleware(slotTrackingMiddleware)
	.addMiddleware(slotPropertiesTrackingMiddleware)
	.register((data) => {
		// Trigger event tracking
		console.info(`🏁 Slot tracker: ${data.kv_pos} ${data.ad_status}`, data);
	});

new AdEngine().init();
