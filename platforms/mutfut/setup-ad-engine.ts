import {
	AdEngine,
	bidders,
	context,
	events,
	eventService,
	geoCacheStorage,
	utils,
} from '@wikia/ad-engine';
import { biddersDelay } from '../shared/bidders/bidders-delay';
import { PageTracker } from '../shared/tracking/page-tracker';
import { babDetection } from '../shared/wad/bab-detection';
import { adsSetup } from './setup';

const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';
const logGroup = 'ad-engine';

export async function setupAdEngine(isOptedIn): Promise<void> {
	// TODO: Add actual context
	const wikiContext = {};

	await adsSetup.configure(wikiContext, isOptedIn);

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
		// Hide All Ad Slots
	}

	trackLabradorValues();
}

function startAdEngine(): void {
	utils.scriptLoader.loadScript(GPT_LIBRARY_URL);

	const engine = new AdEngine();

	engine.init();
	babDetection.run();

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
	const labradorPropValue = geoCacheStorage.getSamplingResults().join(';');

	if (labradorPropValue) {
		PageTracker.trackProp('labrador', labradorPropValue);
	}
}

function callExternals(): void {
	bidders.requestBids({
		responseListener: biddersDelay.markAsReady,
	});

	// ToDo: other externals
}
