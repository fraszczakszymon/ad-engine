import {
	AdSlot,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { calculateAdHeight } from '../helpers/calculate-ad-height';
import { setResolvedImagesInAd } from '../helpers/set-images';

@Injectable()
export class BfaaResolvedHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const adHeight = calculateAdHeight(aspectRatios.resolved);

		this.adSlot.show();
		this.adSlot.getElement().style.setProperty('height', `${adHeight}px`);
		setResolvedImagesInAd(this.adSlot, this.params);
	}

	async onLeave(): Promise<void> {}
}
