const slotNameMapping = {};
const slots = {};
const slotStates = {};

class SlotService {
	add(adSlot) {
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

	get(id) {
		return slots[id];
	}

	getBySlotName(slotName) {
		const id = slotNameMapping[slotName];

		return this.get(id);
	}

	forEach(callback) {
		Object.keys(slots).forEach((id) => {
			callback(slots[id]);
		});
	}

	enable(slotName) {
		setState(slotName, true);
	}

	disable(slotName) {
		setState(slotName, false);
	}
}

export const slotService = new SlotService();

function setState(slotName, state) {
	const slot = slotService.getBySlotName(slotName);
	slotStates[slotName] = state;

	if (slot) {
		if (state) {
			slot.enable();
		} else {
			slot.disable();
		}
	}
}
