import {
	AdSlot,
	slotTweaker,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';

@Injectable()
export class BfaaResolvedHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const aspectRatios = this.params.config.aspectRatio;
		const iframe = await slotTweaker.onReady(this.adSlot);

		// TODO: you can do better
		if (document.hidden) {
			await utils.once(window, 'visibilitychange');
		}

		slotTweaker.setPaddingBottom(iframe, aspectRatios.resolved);
		this.adSlot.getElement().classList.add('theme-hivi');
		// TODO: addAdvertisementLabel
		this.switchImagesInAd();
	}

	private switchImagesInAd(): void {
		this.adSlot.getElement().classList.add(universalAdPackage.CSS_CLASSNAME_THEME_RESOLVED);

		if (this.params.image2 && this.params.image2.background) {
			this.params.image2.element.classList.remove('hidden-state');
			this.params.image1.element.classList.add('hidden-state');
		} else {
			this.params.image1.element.classList.remove('hidden-state');
		}
	}

	async onLeave(): Promise<void> {}
}
