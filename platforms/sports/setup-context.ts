import { getDeviceMode, SharedContextSetup, TrackingRegistry } from '@platforms/shared';
import { context, InstantConfigService, setupNpaContext } from '@wikia/ad-engine';
import { set } from 'lodash';
import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import * as fallbackInstantConfig from './fallback-config.json';
import { SportsTargetingSetup } from './targeting';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	async configure(isOptedIn: boolean): Promise<void> {
		set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);

		const instantConfig = await InstantConfigService.init();
		const sharedContextSetup = new SharedContextSetup(instantConfig);
		const trackingRegistry = new TrackingRegistry();

		sharedContextSetup.setup({ isOptedIn });
		setupNpaContext();
		templateRegistry.registerTemplates();

		trackingRegistry.registerTrackers();
	}

	private different(): void {
		new SportsTargetingSetup().setTargeting();
		context.set('state.isMobile', getDeviceMode() === 'mobile');

		setA9AdapterConfig();
		setPrebidAdaptersConfig(context.get('targeting.s1'));
	}
}

export const adsSetup = new ContextSetup();
