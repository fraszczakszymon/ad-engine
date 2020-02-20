import { TemplatesSetup } from '@platforms/shared';
import { TemplateLogger, TemplateRegistry, templateService } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { merge } from 'rxjs';
import { registerBfaaTemplate } from './bfaa-template';

@Injectable()
export class UcpTemplatesSetup implements TemplatesSetup {
	constructor(private registry: TemplateRegistry, private logger: TemplateLogger) {
		templateService.setInitializer(this.registry);
	}

	configureTemplates(): void {
		const bfaa$ = registerBfaaTemplate(this.registry);

		this.logger.log(merge(bfaa$));
	}
}
