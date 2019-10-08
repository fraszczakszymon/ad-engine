import { biddersDelay, getDeviceMode } from '@platforms/shared';
import { bidders, context, events, eventService, utils } from '@wikia/ad-engine';
import { PlatformSetup } from '../shared/setup/platform-setup';
import { setupIoc } from './setup/setup-ioc';
import { startAdEngine } from './start-ad-engine';

const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	const container = await setupIoc();
	const platformSetup = container.get(PlatformSetup);

	platformSetup.configure({ isOptedIn, isMobile: getDeviceMode() === 'mobile' });

	eventService.on(events.AD_SLOT_CREATED, (slot) => {
		utils.logger(logGroup, `Created ad slot ${slot.getSlotName()}`);
		bidders.updateSlotTargeting(slot.getSlotName());
	});

	if (context.get('state.showAds')) {
		callExternals();
		startAdEngine();
	} else {
		// TODO: Hide All Ad Slots
	}
}

function callExternals(): void {
	bidders.requestBids({
		responseListener: biddersDelay.markAsReady,
	});

	// ToDo: other externals
}
