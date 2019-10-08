import {
	babDetection,
	BiddersConfigSetup,
	biddersDelay,
	getDeviceMode,
	TargetingSetup,
	TemplateRegistry,
} from '@platforms/shared';
import {
	bidders,
	context,
	events,
	eventService,
	InstantConfigService,
	utils,
} from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';
import { PlatformSetup } from '../shared/setup/platform-setup';
import { SportsBiddersConfigSetup } from './bidders/bidders-config-setup';
import * as fallbackInstantConfig from './fallback-config.json';
import { startAdEngine } from './start-ad-engine';
import { SportsTargetingSetup } from './targeting';
import { SportsTemplateRegistry } from './templates/templates-registry';

const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(TargetingSetup).to(SportsTargetingSetup);
	container.bind(BiddersConfigSetup).to(SportsBiddersConfigSetup);
	container.bind(TemplateRegistry).to(SportsTemplateRegistry);

	const platformSetup = container.get(PlatformSetup);

	platformSetup.configure({ isOptedIn, isMobile: getDeviceMode() === 'mobile' });

	// ToDo: video and recovery

	context.push('delayModules', babDetection);
	context.push('delayModules', biddersDelay);

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
