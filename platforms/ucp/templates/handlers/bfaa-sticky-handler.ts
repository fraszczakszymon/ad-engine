import {
	AdSlot,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { isUndefined } from 'util';
import { DomHelper } from '../helpers/dom-helper';
import { DomManipulator } from '../helpers/dom-manipulator';

@Injectable()
export class BfaaStickyHandler implements TemplateStateHandler {
	private helper: DomHelper;
	private manipulator = new DomManipulator();

	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(NAVBAR) private navbar: HTMLElement,
	) {
		this.helper = new DomHelper(this.manipulator, this.params, this.adSlot, this.navbar);
	}

	async onEnter(transition: TemplateTransition<'transition'>): Promise<void> {
		this.adSlot.show();
		this.helper.setResolvedImage();
		this.helper.setResolvedAdHeight();
		this.helper.setAdFixedPosition();
		this.helper.setNavbarFixedPosition();
		this.helper.setBodyPadding();

		this.viewedAndDelayed().then(() => transition('transition'));
	}

	private async viewedAndDelayed(): Promise<void> {
		const slotViewed: Promise<void> = this.adSlot.loaded.then(() => this.adSlot.viewed);
		const videoViewed: Promise<void> = this.params.stickyUntilVideoViewed
			? utils.once(this.adSlot, AdSlot.VIDEO_VIEWED_EVENT)
			: Promise.resolve();
		const unstickDelay: number = isUndefined(this.params.stickyAdditionalTime)
			? universalAdPackage.BFAA_UNSTICK_DELAY
			: this.params.stickyAdditionalTime;

		await Promise.all([slotViewed, videoViewed, utils.wait(unstickDelay)]);
	}

	async onLeave(): Promise<void> {
		this.manipulator.restore();
	}
}
