import {
	AdEngine,
	AdSlot,
	context,
	slotService,
	StickyTLB,
	templateService,
	utils,
} from '@wikia/ad-engine';
import customContext from '../../context';

const disabled = utils.queryString.get('disabled') === '1';
const enabledGeo = utils.queryString.get('enabled-geo') || 'XX';

context.extend(customContext);

context.set('templates.stickyTLB.lineItemIds', [`271491732:${enabledGeo}`]);
context.set('templates.stickyTLB.adContainerSelector', '#top_leaderboard');
context.set('templates.stickyTLB.enabled', !disabled);
context.set('slots.top_leaderboard.defaultTemplates', ['stickyTLB']);

// Include anything from ad-products to register StickyAd template or do it manually
templateService.register(StickyTLB);

slotService.on('top_leaderboard', AdSlot.CUSTOM_EVENT, (event) => {
	console.log(`👁 top_leaderboard custom event: ${event.status}`);
});

new AdEngine(context).init();
