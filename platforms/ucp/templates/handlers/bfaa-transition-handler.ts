import {
	AdSlot,
	DomManipulator,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { from, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DomHelper } from '../helpers/dom-helper';

@Injectable()
export class BfaaTransitionHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();
	private helper: DomHelper;
	private manipulator = new DomManipulator();

	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(NAVBAR) private navbar: HTMLElement,
	) {
		this.helper = new DomHelper(this.manipulator, this.params, this.adSlot, this.navbar);
	}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		this.adSlot.show();
		this.helper.setResolvedImage();
		this.helper.setResolvedAdHeight();
		this.helper.setAdFixedPosition();
		this.helper.setNavbarFixedPosition();
		this.helper.setBodyPadding();

		this.animate()
			.pipe(
				takeUntil(this.unsubscribe$),
				tap(() => {
					const correction = this.helper.useScrollCorrection();

					transition('resolved').then(correction);
				}),
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
			.setProperty('top', `${distance - this.helper.getResolvedAdHeight()}px`);

		return from(utils.wait(duration));
	}

	private calcAnimationDistance(): number {
		const distance = this.helper.getResolvedAdHeight() - window.scrollY;

		return distance <= 0 ? 0 : distance;
	}

	private calcAnimationDuration(distance: number): number {
		const distanceFraction =
			(this.helper.getResolvedAdHeight() - distance) / this.helper.getResolvedAdHeight();

		return distanceFraction * universalAdPackage.SLIDE_OUT_TIME;
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
