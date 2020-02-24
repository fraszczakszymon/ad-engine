import {
	AdSlot,
	DomManipulator,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { DomHelper } from '../helpers/dom-helper';

@Injectable()
export class BfaaResolvedHandler implements TemplateStateHandler {
	private helper: DomHelper;
	private manipulator = new DomManipulator();

	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(NAVBAR) private navbar: HTMLElement,
	) {
		this.helper = new DomHelper(this.manipulator, this.params, this.adSlot, this.navbar);
	}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		this.adSlot.show();
		this.helper.setResolvedImage();
		this.helper.setResolvedAdHeight();
	}

	async onLeave(): Promise<void> {
		this.manipulator.restore();
	}
}
