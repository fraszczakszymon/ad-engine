import {
	AdSlot,
	context,
	TEMPLATE,
	TemplateStateHandler,
	UapParams,
	universalAdPackage,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { TimeoutManager } from '../../helpers/timeout-manager';

@Injectable()
export class BfaaConfigHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		private timeoutManager: TimeoutManager,
	) {}

	async onEnter(): Promise<void> {
		const enabledSlots: string[] = [
			'top_boxad',
			'hivi_leaderboard',
			'bottom_leaderboard',
			'incontent_boxad_1',
		];
		universalAdPackage.init(
			this.params,
			enabledSlots,
			Object.keys(context.get('slots') || []).filter(
				(slotName) => !enabledSlots.includes(slotName),
			),
		);
		context.set('slots.bottom_leaderboard.viewportConflicts', []);
		context.set('slots.bottom_leaderboard.sizes', []);
		context.set('slots.bottom_leaderboard.defaultSizes', [[3, 3]]);

		document.body.classList.add('has-bfaa');
		this.adSlot.setConfigProperty('showManually', true);
		this.adSlot.hide();
		this.adSlot.getElement().style.setProperty('backgroundColor', '#000');
		this.adSlot.addClass('expanded-slot');
		this.adSlot.getAdContainer().classList.add('iframe-container');
		this.ensureImage();
		this.timeoutManager.start(universalAdPackage.BFAA_UNSTICK_DELAY);
	}

	private ensureImage(): void {
		if (!(this.params.image2 && this.params.image2.background)) {
			this.params.image1.element.classList.remove('hidden-state');
		}
	}

	async onLeave(): Promise<void> {}
}
