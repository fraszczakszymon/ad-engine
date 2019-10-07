import { context } from '@wikia/ad-engine';
import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	configure(): void {
		templateRegistry.registerTemplates();
		setA9AdapterConfig();
		setPrebidAdaptersConfig(context.get('targeting.s1'));
	}
}

export const adsSetup = new ContextSetup();
