import { context } from './context-service';
import { events } from './events';
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

function setState(slotName, state, status = null) {
	const slot = slotService.get(slotName);
	slotStates[slotName] = state;
	slotStatuses[slotName] = status;

	if (slot && state) {
		slot.enable();
	} else if (slot && !state) {
		slot.disable(status);
	}
	logger(groupName, 'set state', slotName, state);
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
		if (slots[id]) {
			return slots[id];
		}

		// Find by pos in case of FMR X (slot name is for example incontent_boxad_1 instead of incontent_boxad)
		let slotByPos = null;

		Object.keys(slots).forEach((slot) => {
			slot = slots[slot];

			if (!slotByPos && slot.config && slot.config.targeting && slot.config.targeting.pos &&
				(slot.config.targeting.pos === id || slot.config.targeting.pos[0] === id)) {
				slotByPos = slot;
			}
		});

		return slotByPos;
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

	getState(slotName) {
		// Comparing with false in order to get truthy value for slot
		// that wasn't disabled or enabled (in case when state is undefined)
		return slotStates[slotName] !== false;
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
