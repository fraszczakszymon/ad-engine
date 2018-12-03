import { logger, makeLazyQueue, timer } from '../utils';
import { context } from './context-service';
import { slotService } from './slot-service';
import { events } from './events';

const logGroup = 'btf-blocker';

class BtfBlockerService {
	constructor() {
		this.resetState();
	}

	resetState() {
		this.slotsQueue = [];
		this.firstCallEnded = false;
		/** @type {string[]}  */
		this.unblockedSlotNames = [];

		makeLazyQueue(this.slotsQueue, ({ adSlot, fillInCallback }) => {
			logger(logGroup, adSlot.getSlotName(), 'Filling delayed second call slot');
			// TODO: 'wrappedFillInCallback' doesn't take argument
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
				if (!this.firstCallEnded && adSlot.isFirstCall()) {
					this.finishFirstCall();
				}
			}
		});
		events.on(events.PAGE_CHANGE_EVENT, () => {
			this.resetState();
		});
	}

	finishFirstCall() {
		this.firstCallEnded = true;
		logger(logGroup, 'first call queue finished');

		if (window.ads.runtime.disableBtf) {
			this.disableSecondCall([
				...this.unblockedSlotNames,
				...slotService.getAtfSlotConfigs().map(slot => slot.name),
			]);
		}

		this.slotsQueue.start();
	}

	/** @private */
	disableSecondCall(unblockedSlots) {
		const slots = context.get('slots');
		logger(logGroup, 'second call queue disabled');

		Object.keys(slots)
			.forEach((adSlotKey) => {
				const slotConfig = slots[adSlotKey];

				if (!slotConfig.firstCall && unblockedSlots.indexOf(adSlotKey) === -1) {
					slotService.disable(adSlotKey, 'blocked');
				}
			});
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

		timer.log(
			'push',
			this.firstCallEnded,
			adSlot.isFirstCall(),
		);
		if (!this.firstCallEnded && !adSlot.isFirstCall()) {
			this.slotsQueue.push({ adSlot, fillInCallback: (...args) => wrappedFillInCallback(...args) });
			logger(logGroup, adSlot.getSlotName(), 'second call slot pushed to queue');
			return;
		}

		// TODO: 'wrappedFillInCallback' doesn't take argument
		wrappedFillInCallback(adSlot);
	}

	unblock(slotName) {
		logger(logGroup, slotName, 'Unblocking slot');

		this.unblockedSlotNames.push(slotName);
		slotService.enable(slotName);
	}
}

export const btfBlockerService = new BtfBlockerService();
