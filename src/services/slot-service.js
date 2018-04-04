import { getTopOffset, logger } from '../utils';

const groupName = 'slot-service';
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

	disable(slotName, status = null) {
		setState(slotName, false, status);
	}

	hasViewportConflict(adSlot) {
		const slotHeight = adSlot.getElement().offsetHeight,
			slotOffset = getTopOffset(adSlot.getElement()),
			viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		let hasConflict = false;
		adSlot.getViewportConflicts().every((elementId) => {
			const element = document.getElementById(elementId),
				elementHeight = element.offsetHeight,
				elementOffset = getTopOffset(element),
				isFirst = elementOffset < slotOffset,
				distance = isFirst ? slotOffset - elementOffset - elementHeight :
					elementOffset - slotOffset - slotHeight;

			if (distance < viewportHeight) {
				hasConflict = true;
			}

			logger(groupName, 'hasViewportConflict', hasConflict, adSlot.getSlotName(), elementId);

			return !hasConflict;
		});

		return hasConflict;
	}
}

export const slotService = new SlotService();

function setState(slotName, state, status = null) {
	const slot = slotService.getBySlotName(slotName);
	slotStates[slotName] = state;

	if (slot) {
		if (state) {
			slot.enable();
		} else {
			slot.disable(status);
		}
	}
}
