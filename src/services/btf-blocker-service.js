import { logger, makeLazyQueue } from '../utils';
import { context } from './context-service';
import { slotService } from './slot-service';

const logGroup = 'btf-blocker';

function disableBtf() {
	const slots = context.get('slots');

	Object.keys(slots).forEach((adSlotKey) => {
		const adSlot = slots[adSlotKey];

		if (!adSlot.aboveTheFold && this.unblockedSlots.indexOf(adSlot.getSlotName()) === -1) {
			slotService.disable(adSlot.getSlotName(), 'blocked');
		}
	});
}

function finishQueue() {
	this.atfEnded = true;

	if (window.ads.runtime.disableBtf) {
		disableBtf.bind(this)();
	}

	this.slotsQueue.start();
}

class BtfBlockerService {
	constructor() {
		this.slotsQueue = [];
		this.atfEnded = false;
		this.unblockedSlots = [];
	}

	init() {
		makeLazyQueue(this.slotsQueue, ({ adSlot, fillInCallback }) => {
			logger(logGroup, adSlot.getId(), 'Filling delayed BTF slot');
			fillInCallback(adSlot);
		});

		context.push('listeners.slot', { onRenderEnded: (adSlot) => {
			logger(logGroup, adSlot.getId(), 'Slot rendered');
			if (!this.atfEnded && adSlot.isAboveTheFold()) {
				finishQueue.bind(this)();
			}
		} });
	}

	push(adSlot, fillInCallback) {
		function wrappedFillInCallback() {
			if (slotService.hasViewportConflict(adSlot)) {
				slotService.disable(adSlot.getSlotName(), 'viewport-conflict');
			}

			if (!adSlot.isEnabled()) {
				logger(logGroup, adSlot.getId(), 'Slot blocked', adSlot.getStatus());
				return;
			}

			logger(logGroup, adSlot.getId(), 'Filling in slot');
			fillInCallback(adSlot);
		}

		if (!this.atfEnded && !adSlot.isAboveTheFold()) {
			this.slotsQueue.push({ adSlot, fillInCallback: wrappedFillInCallback });
			logger(logGroup, adSlot.getId(), 'BTF slot pushed to queue');
			return;
		}

		wrappedFillInCallback(adSlot);
	}

	unblock(slotName) {
		logger(logGroup, slotName, 'Unblocking slot');

		this.unblockedSlots.push(slotName);
		slotService.enable(slotName);
	}
}

export const btfBlockerService = new BtfBlockerService();
