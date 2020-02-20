import {
	AdSlot,
	NAVBAR,
	RxjsScrollListener,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { DomHelper } from '../helpers/dom-helper';
import { DomManipulator } from '../helpers/dom-manipulator';

@Injectable()
export class BfaaImpactHandler implements TemplateStateHandler {
	private helper: DomHelper;
	private manipulator = new DomManipulator();
	private unsubscribe$ = new Subject<void>();

	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(NAVBAR) private navbar: HTMLElement,
		private scrollListener: RxjsScrollListener,
	) {
		this.helper = new DomHelper(this.manipulator, this.params, this.adSlot, this.navbar);
	}

	async onEnter(transition: TemplateTransition<'sticky'>): Promise<void> {
		this.adSlot.show();
		this.helper.setImpactImage();
		this.helper.setImpactAdHeight();
		this.helper.setAdFixedPosition();
		this.helper.setNavbarFixedPosition();
		this.helper.setBodyPadding();

		this.scrollListener.scroll$
			.pipe(
				takeUntil(this.unsubscribe$),
				tap(() => {
					this.helper.setImpactAdHeight();
					this.helper.setAdFixedPosition();
					this.helper.setNavbarFixedPosition();
				}),
				filter(() => this.reachedResolvedSize()),
				tap(() => {
					const correction = this.useScrollCorrection();

					transition('sticky').then(correction);
				}),
			)
			.subscribe();
	}

	private reachedResolvedSize(): boolean {
		return this.helper.getImpactAdHeight() <= this.helper.getResolvedAdHeight();
	}

	private useScrollCorrection(): () => void {
		const elementOfReference: HTMLElement = document.querySelector('.wds-global-footer');
		const startValue = elementOfReference.getBoundingClientRect().top;

		return () => window.scrollBy(0, elementOfReference.getBoundingClientRect().top - startValue);
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
