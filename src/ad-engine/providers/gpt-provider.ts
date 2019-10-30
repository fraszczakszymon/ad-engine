// tslint:disable-next-line:no-blacklisted-paths
import { getAdStack } from '../ad-engine';
import { AdSlot, Dictionary, Targeting } from '../models';
import {
	btfBlockerService,
	events,
	eventService,
	slotDataParamsUpdater,
	slotService,
	trackingOptIn,
} from '../services';
import { defer, logger } from '../utils';
import { gptFactory } from './gpt-factory';
import { GptSizeMap } from './gpt-size-map';
import { setupGptTargeting } from './gpt-targeting';
import { Provider } from './provider';

const logGroup = 'gpt-provider';

export const ADX = 'AdX';

let definedSlots: googletag.Slot[] = [];
let initialized = false;

function getAdSlotFromEvent(
	event:
		| googletag.events.ImpressionViewableEvent
		| googletag.events.SlotOnloadEvent
		| googletag.events.SlotRenderEndedEvent
		| googletag.events.slotVisibilityChangedEvent,
) {
	const id = event.slot.getSlotElementId();

	return slotService.get(id);
}

async function configure() {
	const gpt = await gptFactory.init();
	const tag = gpt.pubads();

	tag.disableInitialLoad();

	tag.addEventListener('slotOnload', (event: googletag.events.SlotOnloadEvent) => {
		const adSlot = getAdSlotFromEvent(event);

		adSlot.emit(AdSlot.SLOT_LOADED_EVENT);
	});

	tag.addEventListener('slotRenderEnded', (event: googletag.events.SlotRenderEndedEvent) => {
		// IE doesn't allow us to inspect GPT iframe at this point.
		// Let's launch our callback in a setTimeout instead.
		defer(() => {
			const adSlot = getAdSlotFromEvent(event);
			const adType = getAdType(event, adSlot.getIframe());

			return adSlot.emit(AdSlot.SLOT_RENDERED_EVENT, event, adType);
		});
	});

	tag.addEventListener('impressionViewable', (event: googletag.events.ImpressionViewableEvent) => {
		const adSlot = getAdSlotFromEvent(event);

		adSlot.emit(AdSlot.SLOT_VIEWED_EVENT);
	});

	gpt.enableServices();
}

function getAdType(
	event: googletag.events.SlotRenderEndedEvent,
	iframe: HTMLIFrameElement | null,
): string {
	let isIframeAccessible = false;

	if (event.isEmpty) {
		return AdSlot.STATUS_COLLAPSE;
	}

	try {
		isIframeAccessible = !!iframe.contentWindow.document.querySelector;
	} catch (e) {
		logger(logGroup, 'getAdType', 'iframe is not accessible');
	}

	if (isIframeAccessible && iframe.contentWindow.AdEngine_adType) {
		return iframe.contentWindow.AdEngine_adType;
	}

	return AdSlot.STATUS_SUCCESS;
}

export class GptProvider implements Provider {
	constructor() {
		this.init();
	}

	isInitialized(): boolean {
		return initialized;
	}

	async init(): Promise<void> {
		if (this.isInitialized()) {
			return;
		}

		await setupGptTargeting();
		await configure();
		await this.setupNonPersonalizedAds();
		eventService.on(events.BEFORE_PAGE_CHANGE_EVENT, () => this.destroySlots());
		eventService.on(events.PAGE_RENDER_EVENT, () => this.updateCorrelator());
		initialized = true;
	}

	async setupNonPersonalizedAds(): Promise<void> {
		const gpt = await gptFactory.init();
		const tag = gpt.pubads();

		tag.setRequestNonPersonalizedAds(trackingOptIn.isOptedIn() ? 0 : 1);
	}

	async fillIn(adSlot: AdSlot): Promise<void> {
		const adStack = getAdStack() || [];

		btfBlockerService.push(adSlot, (...args) => {
			this.fillInCallback(...args);
		});
		if (adStack.length === 0) {
			await this.flush();
		}
	}

	private async fillInCallback(adSlot: AdSlot): Promise<void> {
		const gpt = await gptFactory.init();
		const targeting = this.parseTargetingParams(adSlot.getTargeting());
		const sizeMap = new GptSizeMap(adSlot.getSizes());
		const gptSlot = await this.createGptSlot(adSlot, sizeMap);

		gptSlot.addService(gpt.pubads()).setCollapseEmptyDiv(true);

		this.applyTargetingParams(gptSlot, targeting);

		if (adSlot.getConfigProperty('forceSafeFrame')) {
			this.forceSafeFrame(gptSlot);
		}

		slotDataParamsUpdater.updateOnCreate(adSlot, targeting);
		adSlot.updateWinningPbBidderDetails();

		gpt.display(adSlot.getSlotName());
		definedSlots.push(gptSlot);

		if (!adSlot.isFirstCall()) {
			await this.flush();
		}

		logger(logGroup, adSlot.getSlotName(), 'slot added');
	}

	private async createGptSlot(adSlot: AdSlot, sizeMap: GptSizeMap) {
		const gpt = await gptFactory.init();

		if (adSlot.isOutOfPage()) {
			return gpt.defineOutOfPageSlot(adSlot.getAdUnit(), adSlot.getSlotName());
		}

		return gpt
			.defineSlot(adSlot.getAdUnit(), adSlot.getDefaultSizes(), adSlot.getSlotName())
			.defineSizeMapping(await sizeMap.build());
	}

	applyTargetingParams(gptSlot: googletag.Slot, targeting: Targeting) {
		Object.keys(targeting).forEach((key) => {
			let value = targeting[key];

			if (Array.isArray(value)) {
				value = value.map((item) => item.toString());
			} else {
				value = value.toString();
			}
			gptSlot.setTargeting(key, value);
		});
	}

	forceSafeFrame(gptSlot: googletag.Slot) {
		gptSlot.setForceSafeFrame(true);
		gptSlot.setSafeFrameConfig({
			sandbox: true,
		});
	}

	parseTargetingParams(targetingParams: Dictionary): Targeting {
		const result: Dictionary = {};

		Object.keys(targetingParams).forEach((key) => {
			let value = targetingParams[key];

			if (typeof value === 'function') {
				value = value();
			}

			if (value !== null) {
				result[key] = value;
			}
		});

		return result as Targeting;
	}

	async updateCorrelator(): Promise<void> {
		const gpt = await gptFactory.init();
		gpt.pubads().updateCorrelator();
	}

	private async flush(): Promise<void> {
		const gpt = await gptFactory.init();

		if (definedSlots.length) {
			gpt.pubads().refresh(definedSlots, { changeCorrelator: false });
			definedSlots = [];
		}
	}

	async destroyGptSlots(gptSlots: googletag.Slot[]): Promise<void> {
		const gpt = await gptFactory.init();
		logger(logGroup, 'destroySlots', gptSlots);

		gptSlots.forEach((gptSlot) => {
			const adSlot = slotService.get(gptSlot.getSlotElementId());

			slotService.remove(adSlot);
		});

		const success = gpt.destroySlots(gptSlots);

		if (!success) {
			logger(logGroup, 'destroySlots', gptSlots, 'failed');
		}
	}

	async destroySlots(slotNames?: string[]): Promise<boolean> {
		const gpt = await gptFactory.init();
		const allSlots = gpt.pubads().getSlots();
		let slotsToDestroy = allSlots;

		if (slotNames && slotNames.length) {
			slotsToDestroy = allSlots.filter((slot) => {
				const slotId = slot.getSlotElementId();

				if (!slotId) {
					logger(logGroup, 'destroySlots', "slot doesn't return element id", slot);
				} else if (slotNames.indexOf(slotId) > -1) {
					return true;
				}

				return false;
			});
		}

		if (slotsToDestroy.length) {
			await this.destroyGptSlots(slotsToDestroy);
			return true;
		}

		logger(logGroup, 'destroySlots', 'no slots returned to destroy', allSlots, slotNames);
		return false;
	}
}
