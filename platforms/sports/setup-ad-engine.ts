import { babDetection, biddersDelay, TargetingSetup, trackBab } from '@platforms/shared';
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
import * as fallbackInstantConfig from './fallback-config.json';
import { adsSetup } from './setup-context';
import { SportsTargetingSetup } from './targeting';

const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);

	const container = new Container();
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(TargetingSetup).to(SportsTargetingSetup);
	const sharedSetup = container.get(SharedSetup);

	sharedSetup.configure(isOptedIn);
	adsSetup.configure();

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
