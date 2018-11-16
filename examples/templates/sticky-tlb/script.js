import { AdEngine, context, templateService } from '@wikia/ad-engine';
import { StickyTLB } from '@wikia/ad-products';
import customContext from '../../context';

context.extend(customContext);

context.set('templates.stickyTLB.lineItemIds', ['271491732']);
context.set('templates.stickyTLB.adContainerSelector', '#top_leaderboard');
context.set('slots.top_leaderboard.defaultTemplates', ['stickyTLB']);

// Include anything from ad-products to register StickyAd template or do it manually
templateService.register(StickyTLB);

new AdEngine(context).init();
