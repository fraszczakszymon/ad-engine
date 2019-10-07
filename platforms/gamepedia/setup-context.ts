import { SharedContextSetup, TrackingRegistry } from '@platforms/shared';
import { context, InstantConfigService, setupNpaContext, utils } from '@wikia/ad-engine';
import { set } from 'lodash';
import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import * as fallbackInstantConfig from './fallback-config.json';
import { GamepediaTargetingSetup } from './targeting';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	async configure(wikiContext, isOptedIn: boolean): Promise<void> {
		set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);

		const instantConfig = await InstantConfigService.init();
		const sharedContextSetup = new SharedContextSetup(instantConfig);
		const trackingRegistry = new TrackingRegistry();

		sharedContextSetup.setup({ isOptedIn });
		setupNpaContext();
		templateRegistry.registerTemplates();

		trackingRegistry.registerTrackers();
	}

	private different(wikiContext): void {
		context.set('wiki', wikiContext);
		new GamepediaTargetingSetup().setTargeting();
		context.set('state.isMobile', !utils.client.isDesktop());

		setA9AdapterConfig();
		setPrebidAdaptersConfig();
	}
}

export const adsSetup = new ContextSetup();
