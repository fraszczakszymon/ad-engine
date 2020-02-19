import {
	AdSlot,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { adjustFixedUap } from '../helpers/adjust-fixed-uap';
import { calculateAdHeight } from '../helpers/calculate-ad-height';
import { setResolvedImagesInAd } from '../helpers/set-images';

@Injectable()
export class BfaaStickyHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(NAVBAR) private navbar: HTMLElement,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const adHeight = calculateAdHeight(aspectRatios.resolved);

		this.adSlot.show();
		this.adSlot.getElement().style.setProperty('height', `${adHeight}px`);
		setResolvedImagesInAd(this.adSlot, this.params);
		adjustFixedUap(this.adSlot.getElement(), this.navbar);
	}

	async onLeave(): Promise<void> {}
}
