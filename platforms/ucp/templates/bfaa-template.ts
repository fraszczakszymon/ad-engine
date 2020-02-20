import { TemplateAction, TemplateRegistry } from '@wikia/ad-engine';
import { Observable } from 'rxjs';
import { BfaaBootstrapHandler } from './handlers/bfaa-bootstrap-handler';
import { BfaaImpactHandler } from './handlers/bfaa-impact-handler';
import { BfaaResolvedHandler } from './handlers/bfaa-resolved-handler';
import { BfaaStickyHandler } from './handlers/bfaa-sticky-handler';
import { BfaaTransitionHandler } from './handlers/bfaa-transition-handler';

export function registerBfaaTemplate(registry: TemplateRegistry): Observable<TemplateAction> {
	const stream$ = registry.register(
		'bfaa',
		{
			initial: [BfaaBootstrapHandler],
			impact: [BfaaImpactHandler],
			sticky: [BfaaStickyHandler],
			transition: [BfaaTransitionHandler],
			resolved: [BfaaResolvedHandler],
		},
		'initial',
	);

	return stream$;
}
