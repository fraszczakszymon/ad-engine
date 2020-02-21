import {
	AdSlot,
	CloseButton,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';

@Injectable()
export class CloseButtonHandler implements TemplateStateHandler {
	private button: HTMLButtonElement;

	constructor(@Inject(TEMPLATE.SLOT) private adSlot: AdSlot) {}

	async onEnter(transition: TemplateTransition<'transition'>): Promise<void> {
		this.button = new CloseButton({
			onClick: () => transition('transition'),
		}).render();
		this.adSlot.getElement().appendChild(this.button);
	}

	async onLeave(): Promise<void> {
		this.button.remove();
	}
}
