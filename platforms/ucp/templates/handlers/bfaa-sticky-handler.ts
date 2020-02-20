import {
	AdSlot,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { adjustUapFixedPosition } from '../helpers/adjust-uap-fixed-position';
import { calculateAdHeight } from '../helpers/calculate-ad-height';
import { DomManipulator } from '../helpers/dom-manipulator';
import { setResolvedImagesInAd } from '../helpers/set-images';

@Injectable()
export class BfaaStickyHandler implements TemplateStateHandler {
	private manipulator = new DomManipulator();

	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(NAVBAR) private navbar: HTMLElement,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const adHeight = calculateAdHeight(aspectRatios.resolved);

		this.adSlot.show();
		this.manipulator.element(this.adSlot.getElement()).setProperty('height', `${adHeight}px`);
		setResolvedImagesInAd(this.adSlot, this.params);
		adjustUapFixedPosition(this.manipulator, this.adSlot.getElement(), this.navbar);
	}

	async onLeave(): Promise<void> {
		this.manipulator.restore();
	}
}
