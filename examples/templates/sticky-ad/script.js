import { AdEngine, templateService } from '@wikia/ad-engine';
import { StickyAd }	from '@wikia/ad-engine/templates';
import context from '../../context';

templateService.register(StickyAd);

new AdEngine(context).init();
