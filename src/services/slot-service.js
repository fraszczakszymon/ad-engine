import { context, events } from './context-service';
import { getTopOffset, logger } from '../utils';

const groupName = 'slot-service';
const slots = {};
const slotStates = {};
const slotStatuses = {};

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

		slots[slotName] = adSlot;

		if (slotStates[slotName] === false) {
			adSlot.disable(slotStatuses[slotName]);
		}
		if (slotStates[slotName] === true) {
			adSlot.enable();
		}

		events.emit(events.AD_SLOT_CREATED, adSlot);
	}

	remove(adSlot) {
		const slotName = adSlot.getSlotName();

		context.removeListeners(`slots.${slotName}`);
		adSlot.disable('Marked for remove');
		delete slots[slotName];
		delete slotStates[slotName];
		delete slotStatuses[slotName];
	}

	get(id) {
		return slots[id];
	}

	/**
	 * @deprecated since 12.0.0
	 * Use get function
	 */
	getBySlotName(slotName) {
		return this.get(slotName);
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
	const slot = slotService.get(slotName);
	slotStates[slotName] = state;
	slotStatuses[slotName] = status;

	if (slot) {
		if (state) {
			slot.enable();
		} else {
			slot.disable(status);
		}
	}
}
