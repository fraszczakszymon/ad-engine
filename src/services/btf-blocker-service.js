import {logger, makeLazyQueue} from "../utils";
import { context } from './context-service';

const logGroup = 'btf-blocker';

class BtfBlockerService {
	constructor() {
		this._slotsQueue = [];
		this._atfEnded = false;
	}

	init() {
		makeLazyQueue(this._slotsQueue, ({adSlot, fillInCallback}) => {
			logger(logGroup, adSlot.getId(), 'Filling delayed BTF slot');
			fillInCallback(adSlot);
		});

		context.push('listeners.slot', {onRenderEnded: adSlot => {
			logger(logGroup, adSlot.getId(), 'Slot rendered');
			if (!this._atfEnded && adSlot.isAboveTheFold()) {
				this._finishQueue();
			}
		}});
	}

	_finishQueue() {
		this._atfEnded = true;

		if (window.ads.runtime.disableBtf) {
			slotService.forEach((adSlot) => {
				if (!adSlot.isAboveTheFold()) {
					slotService.disable(adSlot.getSlotName());
				}
			});
		}

		this._slotsQueue.start();
	}

	push(adSlot, fillInCallback) {
		if (!this._atfEnded && !adSlot.isAboveTheFold()) {
			this._slotsQueue.push({adSlot, fillInCallback});
			logger(logGroup, adSlot.getId(), 'BTF slot pushed to queue');
			return false;
		}

		if (this._atfEnded && !adSlot.isEnabled()) {
			logger(logGroup, adSlot.getId(), 'BTF slot blocked');
			return false;
		}

		logger(logGroup, adSlot.getId(), 'Filling in slot');
		fillInCallback(adSlot);
	}
}

export const btfBlockerService = new BtfBlockerService();
