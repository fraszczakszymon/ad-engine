import { logger, makeLazyQueue } from '../utils';
import { setupGptTargeting } from './gpt-targeting';
import { slotListener } from '../listeners';
import { slotService, slotDataParamsUpdater } from '../services';

const logGroup = 'gpt-provider';

let definedSlots = [],
	initialized = false;


function configure() {
	const tag = window.googletag.pubads();

	tag.enableSingleRequest();
	tag.disableInitialLoad();
	tag.addEventListener('slotRenderEnded', (event) => {
		const id = event.slot.getSlotElementId(),
			slot = slotService.get(id);

		// IE doesn't allow us to inspect GPT iframe at this point.
		// Let's launch our callback in a setTimeout instead.
		setTimeout(() => {
			slotListener.emitRenderEnded(event, slot);
		}, 0);
	});

	tag.addEventListener('impressionViewable', (event) => {
		const id = event.slot.getSlotElementId(),
			slot = slotService.get(id);

		slotListener.emitImpressionViewable(event, slot);
	});
	window.googletag.enableServices();
}

export class GptProvider {
	constructor() {
		window.googletag = window.googletag || {};
		window.googletag.cmd = window.googletag.cmd || [];

		window.googletag.cmd.push(() => {
			this.init();
		});
	}

	init() {
		if (initialized) {
			return;
		}

		setupGptTargeting();
		configure();
		initialized = true;
	}

	fillIn(adSlot) {
		window.googletag.cmd.push(() => {
			const sizeMapping = window.googletag.sizeMapping(),
				targeting = this.parseTargetingParams(adSlot.getTargeting());

			adSlot.getSizes().forEach((item) => {
				sizeMapping.addSize(item.viewportSize, item.sizes);
			});

			const gptSlot = window.googletag.defineSlot(adSlot.getAdUnit(), adSlot.getDefaultSizes(), adSlot.getId())
				.addService(window.googletag.pubads())
				.setCollapseEmptyDiv(true)
				.defineSizeMapping(sizeMapping.build());

			this.applyTargetingParams(gptSlot, targeting);
			slotDataParamsUpdater.updateOnCreate(adSlot, targeting);

			window.googletag.display(adSlot.getId());
			definedSlots.push(gptSlot);

			if (!adSlot.isAboveTheFold()) {
				this.flush();
			}

			logger(logGroup, adSlot.getId(), 'slot added');
		});
	}

	applyTargetingParams(gptSlot, targeting) {
		Object.keys(targeting).forEach(key => gptSlot.setTargeting(key, targeting[key]));
	}

	parseTargetingParams(targeting) {
		const result = {};

		Object.keys(targeting).forEach((key) => {
			let value = targeting[key];

			if (typeof (value) === 'function') {
				value = value();
			}
			result[key] = value;
		});

		return result;
	}

	flush() {
		window.googletag.cmd.push(() => {
			if (definedSlots.length) {
				window.googletag.pubads().refresh(definedSlots);
				definedSlots = [];
			}
		});
	}
}
