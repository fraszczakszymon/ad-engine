import {
	babDetection,
	BiddersConfigSetup,
	biddersDelay,
	PageTracker,
	TargetingSetup,
	TemplateRegistry,
	WikiContextSetup,
} from '@platforms/shared';
import {
	bidders,
	confiant,
	context,
	durationMedia,
	events,
	eventService,
	InstantConfigCacheStorage,
	InstantConfigService,
	taxonomyService,
	utils,
} from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';
import { PlatformSetup } from '../shared/setup/platform-setup';
import { GamepediaBiddersConfigSetup } from './bidders/bidders-config-setup';
import * as fallbackInstantConfig from './fallback-config.json';
import { GamepediaWikiContextSetup } from './setup/wiki-context-setup';
import { startAdEngine } from './start-ad-engine';
import { GamepediaTargetingSetup } from './targeting';
import { hideAllAdSlots } from './templates/hide-all-ad-slots';
import { GamepediaTemplateRegistry } from './templates/templates-registry';
import { editModeManager } from './utils/edit-mode-manager';

const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(WikiContextSetup).to(GamepediaWikiContextSetup);
	container.bind(TargetingSetup).to(GamepediaTargetingSetup);
	container.bind(BiddersConfigSetup).to(GamepediaBiddersConfigSetup);
	container.bind(TemplateRegistry).to(GamepediaTemplateRegistry);

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
