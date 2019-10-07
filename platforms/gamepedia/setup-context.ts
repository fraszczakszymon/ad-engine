import { setA9AdapterConfig } from './bidders/a9';
import { setPrebidAdaptersConfig } from './bidders/prebid';
import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	configure(): void {
		templateRegistry.registerTemplates();
		setA9AdapterConfig();
		setPrebidAdaptersConfig();
	}
}

export const adsSetup = new ContextSetup();
