import {
	registerPorvataTracker,
	registerPostmessageTrackingTracker,
	registerSlotTracker,
	registerViewabilityTracker,
	SharedContextSetup,
} from '@platforms/shared';
import { context, setupNpaContext, utils } from '@wikia/ad-engine';
import { set } from 'lodash';
import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import * as fallbackInstantConfig from './fallback-config.json';
import { getPageLevelTargeting } from './targeting';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	private sharedContextSetup = new SharedContextSetup();

	async configure(wikiContext, isOptedIn: boolean): Promise<void> {
		set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);

		await this.sharedContextSetup.setup({ isOptedIn });
		setupNpaContext();
		templateRegistry.registerTemplates();

		registerPorvataTracker();
		registerSlotTracker();
		registerViewabilityTracker();
		registerPostmessageTrackingTracker();
	}

	private async different(wikiContext): Promise<void> {
		context.set('wiki', wikiContext);
		context.set('targeting', getPageLevelTargeting());
		context.set('state.isMobile', !utils.client.isDesktop());

		setA9AdapterConfig();
		setPrebidAdaptersConfig();
	}
}

export const adsSetup = new ContextSetup();
