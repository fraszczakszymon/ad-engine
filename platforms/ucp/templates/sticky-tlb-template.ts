import { TemplateAction, TemplateRegistry, universalAdPackage } from '@wikia/ad-engine';
import { Observable } from 'rxjs';
import { AdvertisementLabelHandler } from './handlers/advertisement-label-handler';
import { CloseButtonHandler } from './handlers/close-button-handler';
import { DebugTransitionHandler } from './handlers/debug-transition-handler';
import { DomCleanupHandler } from './handlers/dom-cleanup-handler';
import { StickyDecisionHandler } from './handlers/sticky-decision-handler';
import { StickyTlbBootstrapHandler } from './handlers/sticky-tlb/sticky-tlb-bootstrap-handler';
import { StickyTlbConfigHandler } from './handlers/sticky-tlb/sticky-tlb-config-handler';
import { StickyTlbStaticHandler } from './handlers/sticky-tlb/sticky-tlb-static-handler';
import { StickyTlbStickyHandler } from './handlers/sticky-tlb/sticky-tlb-sticky-handler';
import { StickyTlbTransitionHandler } from './handlers/sticky-tlb/sticky-tlb-transition-handler';
import { DomManipulator } from './helpers/manipulators/dom-manipulator';
import { ScrollCorrector } from './helpers/scroll-corrector';
import { StickinessTimeout } from './helpers/stickiness-timeout';
import { UapDomManager } from './helpers/uap-dom-manager';
import { UapDomReader } from './helpers/uap-dom-reader';

// ToDo: code prio (outstream works)

export function registerStickyTlbTemplate(registry: TemplateRegistry): Observable<TemplateAction> {
	return registry.register(
		'stickyTlb',
		{
			initial: [StickyTlbBootstrapHandler, DebugTransitionHandler],
			configure: [StickyTlbConfigHandler, AdvertisementLabelHandler],
			sticky: [CloseButtonHandler, StickyDecisionHandler, StickyTlbStickyHandler],
			transition: [StickyTlbTransitionHandler, DomCleanupHandler],
			static: [StickyTlbStaticHandler],
		},
		'initial',
		[
			DomManipulator,
			UapDomManager,
			UapDomReader,
			ScrollCorrector,
			StickinessTimeout.provide(universalAdPackage.BFAA_UNSTICK_DELAY),
		],
	);
}
