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
import { DomManipulator } from '../helpers/dom-manipulator';
import { setAdHeight } from '../helpers/set-ad-height';
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
		this.adSlot.show();
		setAdHeight(this.manipulator, this.adSlot, this.params.config.aspectRatio.resolved);
		setResolvedImagesInAd(this.manipulator, this.params);
		adjustUapFixedPosition(this.manipulator, this.adSlot.getElement(), this.navbar);
	}

	async onLeave(): Promise<void> {
		this.manipulator.restore();
	}
}
