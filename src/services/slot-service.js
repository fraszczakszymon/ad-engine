import { getTopOffset, logger } from '../utils';

const groupName = 'slot-service';
const slotNameMapping = {};
const slots = {};
const slotStates = {};

function isSlotInTheSameViewport(slotHeight, slotOffset, viewportHeight, elementId) {
	const element = document.getElementById(elementId);

	// According to https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
	// Hidden element does not have offsetParent
	if (element.offsetParent === null) {
		return false;
	}

	const elementHeight = element.offsetHeight,
		elementOffset = getTopOffset(element),
		isFirst = elementOffset < slotOffset,
		distance = isFirst ? slotOffset - elementOffset - elementHeight :
			elementOffset - slotOffset - slotHeight;

	return distance < viewportHeight;
}

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

	remove(adSlot) {
		const slotName = adSlot.getSlotName();

		adSlot.disable('Marked for remove');
		delete slots[adSlot.getId()];
		delete slotNameMapping[slotName];
		delete slotStates[slotName];
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
		if (!adSlot.hasDefinedViewportConflicts() || adSlot.getElement() === null) {
			return false;
		}

		const slotHeight = adSlot.getElement().offsetHeight,
			slotOffset = getTopOffset(adSlot.getElement()),
			viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

		const hasConflict = adSlot.getViewportConflicts().some(
			elementId => isSlotInTheSameViewport(slotHeight, slotOffset, viewportHeight, elementId)
		);
		logger(groupName, 'hasViewportConflict', adSlot.getSlotName(), hasConflict);

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
