import { logger, makeLazyQueue } from '../utils';
import { context } from './context-service';
import { slotService } from './slot-service';

const logGroup = 'btf-blocker';

function disableBtf() {
	const slots = context.get('slots');

	Object.keys(slots).forEach((adSlotKey) => {
		const slotConfig = slots[adSlotKey];

		if (!slotConfig.aboveTheFold && this.unblockedSlots.indexOf(slotConfig.slotName) === -1) {
			slotService.disable(slotConfig.slotName, 'blocked');
		}
	});
}

class BtfBlockerService {
	constructor() {
		this.resetState();
	}

	resetState() {
		this.slotsQueue = [];
		this.atfEnded = false;
		this.unblockedSlots = [];

		makeLazyQueue(this.slotsQueue, ({ adSlot, fillInCallback }) => {
			logger(logGroup, adSlot.getId(), 'Filling delayed BTF slot');
			fillInCallback(adSlot);
		});

		if (window.ads && window.ads.runtime) {
			window.ads.runtime.disableBtf = false;
		}
	}

	init() {
		context.push('listeners.slot', {
			onRenderEnded: (adSlot) => {
				logger(logGroup, adSlot.getId(), 'Slot rendered');
				if (!this.atfEnded && adSlot.isAboveTheFold()) {
					this.finishAboveTheFold();
				}
			}
		});
	}

	finishAboveTheFold() {
		this.atfEnded = true;

		if (window.ads.runtime.disableBtf) {
			disableBtf.bind(this)();
		}

		this.slotsQueue.start();
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
