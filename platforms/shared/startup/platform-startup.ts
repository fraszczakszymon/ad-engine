import { bidders, context, events, eventService, utils } from '@wikia/ad-engine';

const logGroup = 'ad-engine';

export class PlatformStartup {
	startPlatform(): void {
		eventService.on(events.AD_SLOT_CREATED, (slot) => {
			utils.logger(logGroup, `Created ad slot ${slot.getSlotName()}`);
			bidders.updateSlotTargeting(slot.getSlotName());
		});

		if (context.get('state.showAds')) {
			// pre start action
			// ad engine start
		} else {
			// do not start and engine
		}

		// labrador tacker
	}
}
