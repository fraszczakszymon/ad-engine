import { AdEngine, context, templateService } from '@wikia/ad-engine';
import { StickyAd } from '@wikia/ad-products';
import adContext from '../../context';

context.extend(adContext);
context.set('slots.top_leaderboard.defaultTemplate', 'stickyAd');

templateService.register(StickyAd);

new AdEngine(context).init();
