import { AdSlot, context, slotInjector, slotService } from '@wikia/ad-engine';
import { slotsContext } from '../slots';

export function injectIncontentPlayer(): void {
	const incontentPlayerSlotName = 'incontent_player';
	const porvataAlternativeSlotsName = 'cdm-zone-02';

	if (
		!!document.getElementById('mf-video') ||
		!!document.getElementById('twitchnet-liveontwitch') ||
		!!document.getElementById('ds_cpp')
	) {
		return;
	}

	if (!document.getElementById(porvataAlternativeSlotsName)) {
		initiateIncontentPlayer(incontentPlayerSlotName);
	}

	slotService.on(porvataAlternativeSlotsName, AdSlot.STATUS_SUCCESS, () => {
		if (!!context.get('options.video.porvataLoaded')) {
			return;
		}
		initiateIncontentPlayer(incontentPlayerSlotName);
	});

	slotService.on(porvataAlternativeSlotsName, AdSlot.STATUS_COLLAPSE, () => {
		initiateIncontentPlayer(incontentPlayerSlotName);
	});
}

function initiateIncontentPlayer(slotName: string): void {
	slotInjector.inject(slotName);
	slotsContext.setState(slotName, context.get('options.video.isOutstreamEnabled'));
}
