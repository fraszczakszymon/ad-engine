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
import { StylesManager } from '../helpers/styles-manager';

@Injectable()
export class BfaaResolvedHandler implements TemplateStateHandler {
	private stylesManager = new StylesManager();

	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const adHeight = calculateAdHeight(aspectRatios.resolved);

		this.adSlot.show();
		this.stylesManager.element(this.adSlot.getElement()).property('height', `${adHeight}px`);
		setResolvedImagesInAd(this.adSlot, this.params);
	}

	async onLeave(): Promise<void> {
		this.stylesManager.restore();
	}
}
