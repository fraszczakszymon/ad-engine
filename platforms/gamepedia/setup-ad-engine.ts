import {
	babDetection,
	biddersDelay,
	PageTracker,
	TargetingSetup,
	trackBab,
	WikiContextSetup,
} from '@platforms/shared';
import {
	AdEngine,
	bidders,
	btRec,
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
import { SharedSetup } from '../shared/setup/shared-setup';
import * as fallbackInstantConfig from './fallback-config.json';
import { adsSetup } from './setup-context';
import { GamepediaWikiContextSetup } from './setup/wiki-context-setup';
import { GamepediaTargetingSetup } from './targeting';
import { hideAllAdSlots } from './templates/hide-all-ad-slots';
import { editModeManager } from './utils/edit-mode-manager';

const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);

	const container = new Container();
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(WikiContextSetup).to(GamepediaWikiContextSetup);
	container.bind(TargetingSetup).to(GamepediaTargetingSetup);
	const sharedSetup = container.get(SharedSetup);

	sharedSetup.configure({ isOptedIn, isMobile: !utils.client.isDesktop() });
	adsSetup.configure();

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

function startAdEngine(): void {
	utils.scriptLoader.loadScript(GPT_LIBRARY_URL);

	const engine = new AdEngine();

	engine.init();

	if (babDetection.isEnabled()) {
		babDetection.run().then((isBabDetected) => {
			trackBab(isBabDetected);

			if (isBabDetected) {
				btRec.run();
			}
		});
	}

	context.push('listeners.slot', {
		onRenderEnded: (slot) => {
			slot.getElement().classList.remove('default-height');
		},
	});

	context.push('state.adStack', { id: 'cdm-zone-01' });
	context.push('state.adStack', { id: 'cdm-zone-02' });
	context.push('state.adStack', { id: 'cdm-zone-03' });
	context.push('state.adStack', { id: 'cdm-zone-04' });
	context.push('state.adStack', { id: 'cdm-zone-06' });
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
