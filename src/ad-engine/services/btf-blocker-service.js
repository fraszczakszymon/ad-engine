import { logger, makeLazyQueue } from '../utils';
import { context } from './context-service';
import { slotService } from './slot-service';
import { events } from './events';

const logGroup = 'btf-blocker';

function disableBtf(unblockedSlots) {
	const slots = context.get('slots');
	logger(logGroup, 'BTF queue disabled');

	Object.keys(slots).forEach((adSlotKey) => {
		const slotConfig = slots[adSlotKey];

		if (!slotConfig.aboveTheFold && unblockedSlots.indexOf(adSlotKey) === -1) {
			slotService.disable(adSlotKey, 'blocked');
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
			logger(logGroup, adSlot.getSlotName(), 'Filling delayed BTF slot');
			fillInCallback(adSlot);
		});

		if (window.ads && window.ads.runtime) {
			window.ads.runtime.disableBtf = false;
		}
	}

	init() {
		context.push('listeners.slot', {
			onRenderEnded: (adSlot) => {
				logger(logGroup, adSlot.getSlotName(), 'Slot rendered');
				if (!this.atfEnded && adSlot.isAboveTheFold()) {
					this.finishAboveTheFold();
				}
			}
		});
		events.on(events.PAGE_CHANGE_EVENT, () => {
			this.resetState();
		});
	}

	finishAboveTheFold() {
		this.atfEnded = true;
		logger(logGroup, 'ATF queue finished');

		if (window.ads.runtime.disableBtf) {
			disableBtf(this.unblockedSlots);
		}

		this.slotsQueue.start();
	}

	push(adSlot, fillInCallback) {
		function wrappedFillInCallback() {
			if (slotService.hasViewportConflict(adSlot)) {
				slotService.disable(adSlot.getSlotName(), 'viewport-conflict');
			}

			if (!adSlot.isEnabled()) {
				logger(logGroup, adSlot.getSlotName(), 'Slot blocked', adSlot.getStatus());
				return;
			}

			logger(logGroup, adSlot.getSlotName(), 'Filling in slot');
			fillInCallback(adSlot);
		}

		if (!this.atfEnded && !adSlot.isAboveTheFold()) {
			this.slotsQueue.push({ adSlot, fillInCallback: wrappedFillInCallback });
			logger(logGroup, adSlot.getSlotName(), 'BTF slot pushed to queue');
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
