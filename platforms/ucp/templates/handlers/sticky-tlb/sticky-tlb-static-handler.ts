import { AdSlot, TEMPLATE, TemplateStateHandler } from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';

@Injectable({ autobind: false })
export class StickyTlbStaticHandler implements TemplateStateHandler {
	constructor(@Inject(TEMPLATE.SLOT) private adSlot: AdSlot) {}

	async onEnter(): Promise<void> {
		if (this.adSlot.isDismissed()) {
			this.adSlot.hide();
		}
	}

	async onLeave(): Promise<void> {}
}
