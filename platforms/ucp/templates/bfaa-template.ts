import { TemplateRegistry } from '@wikia/ad-engine';
import { BfaaBootstrapHandler } from './handlers/bfaa-bootstrap-handler';
import { BfaaResolvedHandler } from './handlers/bfaa-resolved-handler';

export function registerBfaaTemplate(registry: TemplateRegistry): void {
	registry.register(
		'bfaa',
		{
			initial: [BfaaBootstrapHandler],
			resolved: [BfaaResolvedHandler],
		},
		'initial',
	);
}
