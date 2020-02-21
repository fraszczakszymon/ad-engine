import {
	AdSlot,
	AdvertisementLabel,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';

@Injectable()
export class AdvertisementLabelHandler implements TemplateStateHandler {
	constructor(@Inject(TEMPLATE.SLOT) private adSlot: AdSlot) {}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		const advertisementLabel = new AdvertisementLabel();

		this.adSlot.getElement().appendChild(advertisementLabel.render());
	}

	async onLeave(): Promise<void> {}
}
