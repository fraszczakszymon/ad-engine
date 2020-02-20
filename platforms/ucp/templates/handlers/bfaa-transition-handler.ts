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
		this.animateNavbar();
		this.animateAdSlot();

		await this.awaitAnimation();

		const correction = this.useScrollCorrection();

		transition('resolved').then(correction);
	}

	private animateNavbar(): void {
		this.manipulator
			.element(this.navbar)
			.setProperty(
				'transition',
				`top ${universalAdPackage.SLIDE_OUT_TIME}ms ${universalAdPackage.CSS_TIMING_EASE_IN_CUBIC}`,
			)
			.setProperty('top', '0');
	}

	private animateAdSlot(): void {
		this.manipulator
			.element(this.adSlot.getElement())
			.setProperty('animationDirection', `${universalAdPackage.SLIDE_OUT_TIME}ms`)
			.addClass(universalAdPackage.CSS_CLASSNAME_SLIDE_OUT_ANIMATION);
	}

	private async awaitAnimation(): Promise<void> {
		await utils.wait(universalAdPackage.SLIDE_OUT_TIME);
	}

	private useScrollCorrection(): () => void {
		const startValue = window.scrollY;

		return () => window.scrollBy(0, startValue - window.scrollY);
	}

	async onLeave(): Promise<void> {
		this.manipulator.restore();
	}
}
