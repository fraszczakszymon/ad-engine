import {
	AdSlot,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { from, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DomManipulator } from '../../helpers/manipulators/dom-manipulator';
import { ScrollCorrector } from '../../helpers/scroll-corrector';

@Injectable({ autobind: false })
export class StickyTlbTransitionHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();

	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(NAVBAR) private navbar: HTMLElement,
		private scrollCorrector: ScrollCorrector,
		private manipulator: DomManipulator,
	) {}

	async onEnter(transition: TemplateTransition<'static'>): Promise<void> {
		this.animate()
			.pipe(
				tap(() => {
					const correction = this.scrollCorrector.useScrollCorrection();

					transition('static').then(correction);
				}),
				takeUntil(this.unsubscribe$),
			)
			.subscribe();
	}

	private animate(): Observable<unknown> {
		const distance = this.calcAnimationDistance();
		const duration = this.calcAnimationDuration(distance);

		this.manipulator
			.element(this.navbar)
			.setProperty('transition', `top ${duration}ms ${universalAdPackage.CSS_TIMING_EASE_IN_CUBIC}`)
			.setProperty('top', `${distance}px`);

		this.manipulator
			.element(this.adSlot.getElement())
			.setProperty('transition', `top ${duration}ms ${universalAdPackage.CSS_TIMING_EASE_IN_CUBIC}`)
			.setProperty('top', `${distance - this.adSlot.element.offsetHeight}px`);

		return from(utils.wait(duration));
	}

	private calcAnimationDistance(): number {
		const distance = this.adSlot.element.offsetHeight - window.scrollY;

		return distance <= 0 ? 0 : distance;
	}

	private calcAnimationDuration(distance: number): number {
		const distanceFraction =
			(this.adSlot.element.offsetHeight - distance) / this.adSlot.element.offsetHeight;

		return distanceFraction * universalAdPackage.SLIDE_OUT_TIME;
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
	}
}
