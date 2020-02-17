import { TemplatesSetup } from '@platforms/shared';
import { TemplateRegistry, templateService } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { registerBfaaTemplate } from './bfaa-template';

@Injectable()
export class UcpTemplatesSetup implements TemplatesSetup {
	constructor(private registry: TemplateRegistry) {}

	configureTemplates(): void {
		templateService.setInitializer(this.registry);
		registerBfaaTemplate(this.registry);
	}
}
