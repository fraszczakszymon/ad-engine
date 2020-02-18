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
export class BfaaBootstrapHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
	) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		this.adSlot.setConfigProperty('showManually', true);
		this.adSlot.hide();
		universalAdPackage.init(this.params, ['top_boxad'], []); // TODO: refactor
		this.adSlot.getElement().style.setProperty('backgroundColor', '#000');
		this.adSlot.addClass('bfaa-template');
		this.adSlot.addClass('slot-responsive');

		const iframe = await slotTweaker.onReady(this.adSlot);

		document.body.style.setProperty('paddingTop', iframe.parentElement.style.paddingBottom);
		document.body.classList.add('has-bfaa');
		this.adSlot.show();

		// TODO: you can do better
		if (document.hidden) {
			await utils.once(window, 'visibilitychange');
		}

		// TODO: make decision for resolved/impact
		transition('resolved');
	}

	async onLeave(): Promise<void> {}
}
