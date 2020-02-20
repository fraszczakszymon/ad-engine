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
import { takeUntil, tap } from 'rxjs/operators';
import { adjustUapFixedPosition } from '../helpers/adjust-uap-fixed-position';
import { DomManipulator } from '../helpers/dom-manipulator';
import { setAdHeight, setImpactAdHeight } from '../helpers/set-ad-height';
import { setImpactImagesInAd } from '../helpers/set-images';

@Injectable()
export class BfaaImpactHandler implements TemplateStateHandler {
	private manipulator = new DomManipulator();
	private unsubscribe$ = new Subject<void>();

	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(NAVBAR) private navbar: HTMLElement,
		private scrollListener: RxjsScrollListener,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		this.adSlot.show();
		setAdHeight(this.manipulator, this.adSlot, this.params.config.aspectRatio.default);
		setImpactImagesInAd(this.manipulator, this.params);
		adjustUapFixedPosition(this.manipulator, this.adSlot.getElement(), this.navbar);

		this.scrollListener.scroll$
			.pipe(
				takeUntil(this.unsubscribe$),
				tap(() => {
					setImpactAdHeight(this.manipulator, this.adSlot, this.params.config.aspectRatio);
					adjustUapFixedPosition(this.manipulator, this.adSlot.getElement(), this.navbar);
				}),
			)
			.subscribe();
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
