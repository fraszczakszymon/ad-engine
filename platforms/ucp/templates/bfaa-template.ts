import { ofTemplateAction, TemplateAction, TemplateRegistry } from '@wikia/ad-engine';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
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

	handleScrollPosition(stream$);

	return stream$;
}

function handleScrollPosition(stream$: Observable<TemplateAction>): void {
	const leaving$ = stream$.pipe(
		ofTemplateAction('leaving'),
		map(() => window.scrollY),
	);
	const entered$ = stream$.pipe(
		ofTemplateAction('entered'),
		map(() => window.scrollY),
	);

	entered$
		.pipe(
			withLatestFrom(leaving$),
			tap(([entered, leaving]) => window.scrollBy(0, leaving - entered)),
		)
		.subscribe();
}
