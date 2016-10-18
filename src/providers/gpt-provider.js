import { logger } from '../utils/logger';
import { makeLazyQueue } from '../utils/lazy-queue';
import { setupGptTargeting } from './gpt-targeting';
import SlotListener from './../listeners/slot-listener';
import SlotService from './../services/slot-service';

const logGroup = 'gpt-provider',
	slotsQueue = [];

let atfEnded = false,
	definedSlots = [],
	initialized = false;

function finishAtf() {
	atfEnded = true;
	if (window.ads.runtime.disableBtf) {
		SlotService.forEach((adSlot) => {
			if (!adSlot.isAboveTheFold()) {
				SlotService.disable(adSlot.getSlotName());
			}
		});
	}
	slotsQueue.start();
}

function configure() {
	const tag = window.googletag.pubads();

	tag.enableSingleRequest();
	tag.disableInitialLoad();
	tag.addEventListener('slotRenderEnded', (event) => {
		const id = event.slot.getSlotElementId(),
			slot = SlotService.get(id);

		if (!atfEnded && slot.isAboveTheFold()) {
			finishAtf();
		}

		// IE doesn't allow us to inspect GPT iframe at this point.
		// Let's launch our callback in a setTimeout instead.
		setTimeout(() => {
			SlotListener.onRenderEnded(event, slot);
		}, 0);
	});
	window.googletag.enableServices();
}

function shouldPush(adSlot) {
	if (!atfEnded && !adSlot.isAboveTheFold()) {
		slotsQueue.push(adSlot);
		logger(logGroup, adSlot.getId(), 'BTF slot pushed to queue');
		return false;
	}

	if (atfEnded && !adSlot.isEnabled()) {
		logger(logGroup, adSlot.getId(), 'BTF slot blocked');
		return false;
	}

	return true;
}

export default class Gpt {
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
		makeLazyQueue(slotsQueue, (adSlot) => {
			this.fillIn(adSlot);
		});
		initialized = true;
	}

	fillIn(adSlot) {
		if (!shouldPush(adSlot)) {
			return;
		}

		window.googletag.cmd.push(() => {
			const sizeMapping = window.googletag.sizeMapping(),
				targeting = adSlot.getTargeting();

			let gptSlot = null;

			adSlot.getSizes().forEach((item) => {
				sizeMapping.addSize(item.viewportSize, item.sizes);
			});

			gptSlot = window.googletag.defineSlot(adSlot.getAdUnit(), adSlot.getDefaultSizes(), adSlot.getId())
				.addService(window.googletag.pubads())
				.setCollapseEmptyDiv(true)
				.defineSizeMapping(sizeMapping.build())
				.setTargeting('pos', adSlot.getSlotName())
				.setTargeting('src', 'gpt');

			Object.keys(targeting).forEach((key) => {
				gptSlot.setTargeting(key, targeting[key]);
			});

			window.googletag.display(adSlot.getId());
			definedSlots.push(gptSlot);

			if (atfEnded) {
				this.flush();
			}

			logger(logGroup, adSlot.getId(), 'slot added');
		});
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
