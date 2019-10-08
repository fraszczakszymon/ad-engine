import { babDetection, biddersDelay, PageTracker } from '@platforms/shared';
import {
	bidders,
	confiant,
	context,
	durationMedia,
	events,
	eventService,
	InstantConfigCacheStorage,
	taxonomyService,
	utils,
} from '@wikia/ad-engine';
import { PlatformSetup } from '../shared/setup/platform-setup';
import { setupIoc } from './setup/setup-ioc';
import { startAdEngine } from './start-ad-engine';
import { hideAllAdSlots } from './templates/hide-all-ad-slots';
import { editModeManager } from './utils/edit-mode-manager';

const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	const container = await setupIoc();
	const platformSetup = container.get(PlatformSetup);

	platformSetup.configure({ isOptedIn, isMobile: !utils.client.isDesktop() });

	// ToDo: video and recovery

	context.push('delayModules', babDetection);
	context.push('delayModules', biddersDelay);
	context.push('delayModules', taxonomyService);

	eventService.on(events.AD_SLOT_CREATED, (slot) => {
		utils.logger(logGroup, `Created ad slot ${slot.getSlotName()}`);
		bidders.updateSlotTargeting(slot.getSlotName());
	});

	if (context.get('state.showAds')) {
		editModeManager.onActivate(() => hideAllAdSlots());
		callExternals();
		startAdEngine();
	} else {
		hideAllAdSlots();
	}

	trackLabradorValues();
}

function trackLabradorValues(): void {
	const cacheStorage = InstantConfigCacheStorage.make();
	const labradorPropValue = cacheStorage.getSamplingResults().join(';');

	if (labradorPropValue) {
		PageTracker.trackProp('labrador', labradorPropValue);
	}
}

function callExternals(): void {
	bidders.requestBids({
		responseListener: biddersDelay.markAsReady,
	});

	confiant.call();
	durationMedia.call();

	taxonomyService.configurePageLevelTargeting();
}
