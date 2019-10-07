import {
	babDetection,
	biddersDelay,
	BiddersSetup,
	getDeviceMode,
	TargetingSetup,
	TemplateRegistry,
	trackBab,
} from '@platforms/shared';
import {
	AdEngine,
	bidders,
	btRec,
	context,
	events,
	eventService,
	InstantConfigService,
	utils,
} from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';
import { SharedSetup } from '../shared/setup/shared-setup';
import { SportsBiddersSetup } from './bidders/bidders-setup';
import * as fallbackInstantConfig from './fallback-config.json';
import { SportsTargetingSetup } from './targeting';
import { SportsTemplateRegistry } from './templates/templates-registry';

const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(TargetingSetup).to(SportsTargetingSetup);
	container.bind(BiddersSetup).to(SportsBiddersSetup);
	container.bind(TemplateRegistry).to(SportsTemplateRegistry);

	const sharedSetup = container.get(SharedSetup);

	sharedSetup.configure({ isOptedIn, isMobile: getDeviceMode() === 'mobile' });

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
	context.push('state.adStack', { id: 'cdm-zone-06' });
	context.push('events.pushOnScroll.ids', 'cdm-zone-04');
}

function callExternals(): void {
	bidders.requestBids({
		responseListener: biddersDelay.markAsReady,
	});

	// ToDo: other externals
}
