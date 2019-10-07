import { context, utils } from '@wikia/ad-engine';
import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	async configure(): Promise<void> {
		context.set('state.isMobile', !utils.client.isDesktop());

		templateRegistry.registerTemplates();
		setA9AdapterConfig();
		setPrebidAdaptersConfig();
	}
}

export const adsSetup = new ContextSetup();
