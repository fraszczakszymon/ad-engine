'use strict';

let slotNameMapping = {},
	slots = {},
	slotStates = {};

function setState(slotName, state) {
	const slot = SlotService.getBySlotName(slotName);
	slotStates[slotName] = state;

	if (slot) {
		if (state) {
			slot.enable();
		} else {
			slot.disable();
		}
	}
}

export default class SlotService {
	static add(adSlot) {
		const slotName = adSlot.getSlotName();

		slots[adSlot.getId()] = adSlot;
		slotNameMapping[slotName] = adSlot.getId();

		if (slotStates[slotName] === false) {
			adSlot.disable();
		}
		if (slotStates[slotName] === true) {
			adSlot.enable();
		}
	}

	static get(id) {
		return slots[id];
	}

	static getBySlotName(slotName) {
		const id = slotNameMapping[slotName];
		if (id) {
			return this.get(id);
		}
	}

	static forEach(callback) {
		Object.keys(slots).forEach((id) => {
			callback(slots[id]);
		});
	}

	static enable(slotName) {
		setState(slotName, true);
	}

	static disable(slotName) {
		setState(slotName, false);
	}
}
