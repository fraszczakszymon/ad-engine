import {
	AdSlot,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { DomHelper } from '../helpers/dom-helper';
import { DomManipulator } from '../helpers/dom-manipulator';

@Injectable()
export class BfaaTransitionHandler implements TemplateStateHandler {
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

		await this.animate();

		const correction = this.useScrollCorrection();

		transition('resolved').then(correction);
	}

	private async animate(): Promise<void> {
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

		await utils.wait(duration);
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

	private useScrollCorrection(): () => void {
		const startValue = window.scrollY;

		return () => window.scrollBy(0, startValue - window.scrollY);
	}

	async onLeave(): Promise<void> {
		this.manipulator.restore();
	}
}
