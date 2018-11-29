import { AdEngine, context, templateService, utils } from '@wikia/ad-engine';
import { StickyAd } from '@wikia/ad-products';
import adContext from '../../context';

const enabledGeo = utils.queryString.get('enabled-geo') || 'XX';

context.extend(adContext);

context.set('templates.stickyAd.lineItemIds', [`271491732:${enabledGeo}`]);
context.set('slots.top_leaderboard.defaultTemplates', ['stickyAd']);

// Include anything from ad-products to register StickyAd template or do it manually
templateService.register(StickyAd);

new AdEngine(context).init();
