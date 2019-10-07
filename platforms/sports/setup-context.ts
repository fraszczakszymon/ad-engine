import {
	getDeviceMode,
	registerPorvataTracker,
	registerPostmessageTrackingTracker,
	registerSlotTracker,
	registerViewabilityTracker,
	SharedContextSetup,
} from '@platforms/shared';
import { context, InstantConfigService, setupNpaContext } from '@wikia/ad-engine';
import { set } from 'lodash';
import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import * as fallbackInstantConfig from './fallback-config.json';
import { getPageLevelTargeting } from './targeting';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	async configure(isOptedIn: boolean): Promise<void> {
		const instantConfig = await InstantConfigService.init();
		const sharedContextSetup = new SharedContextSetup(instantConfig);

		set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);

		sharedContextSetup.setup({ isOptedIn });
		setupNpaContext();
		templateRegistry.registerTemplates();

		registerPorvataTracker();
		registerSlotTracker();
		registerViewabilityTracker();
		registerPostmessageTrackingTracker();
	}

	private async different(): Promise<void> {
		context.set('targeting', getPageLevelTargeting());
		context.set('state.isMobile', getDeviceMode() === 'mobile');

		setA9AdapterConfig();
		setPrebidAdaptersConfig(context.get('targeting.s1'));
	}
}

export const adsSetup = new ContextSetup();
