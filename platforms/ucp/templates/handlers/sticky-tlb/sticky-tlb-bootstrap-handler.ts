import {
	AdSlot,
	context,
	slotService,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';

@Injectable({ autobind: false })
export class StickyTlbBootstrapHandler implements TemplateStateHandler {
	constructor(@Inject(TEMPLATE.SLOT) private adSlot: AdSlot) {}

	async onEnter(transition: TemplateTransition<'configure'>): Promise<void> {
		if (!this.isLineAndGeo()) {
			this.adSlot.emitEvent(universalAdPackage.SLOT_STICKINESS_DISABLED);
			return;
		}

		this.adSlot.setConfigProperty('showManually', true);
		this.adSlot.hide();
		this.adSlot.setConfigProperty('useGptOnloadEvent', true);
		this.adSlot.loaded.then(() => {
			this.adSlot.emitEvent(universalAdPackage.SLOT_STICKY_READY_STATE);
		});

		slotService.disable('incontent_player', 'hivi-collapse');

		transition('configure');
	}

	private isLineAndGeo(): boolean {
		const lines = context.get('templates.stickyTlb.lineItemIds') || [];

		return lines.some((line) => {
			const [lineId, geo] = line.split(':', 2);

			return (
				lineId.toString() === this.adSlot.lineItemId.toString() &&
				(!geo || utils.geoService.isProperGeo([geo]))
			);
		});
	}

	async onLeave(): Promise<void> {}
}
