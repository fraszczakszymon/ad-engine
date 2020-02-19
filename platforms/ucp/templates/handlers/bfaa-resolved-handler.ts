import {
	AdSlot,
	slotTweaker,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { setResolvedImagesInAd } from '../helpers/set-images';

@Injectable()
export class BfaaResolvedHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const iframe = this.adSlot.getIframe();

		slotTweaker.setPaddingBottom(iframe, aspectRatios.resolved);
		setResolvedImagesInAd(this.adSlot, this.params);
	}

	async onLeave(): Promise<void> {}
}
