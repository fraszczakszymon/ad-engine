import { templateRegistry } from './templates/templates-registry';

class ContextSetup {
	configure(): void {
		templateRegistry.registerTemplates();
	}
}

export const adsSetup = new ContextSetup();
