import { context } from './context-service';
import { logger } from '../utils';
import { getTopOffset, getViewportHeight } from '../utils/dimensions';
import { stringBuilder } from '../utils/string-builder';

const logGroup = 'slot-repeater';

function findNextSibling(lastSlotElement, config) {
	const elements = document.querySelectorAll(config.appendBeforeSelector);
	const minimalPosition = getTopOffset(lastSlotElement) + lastSlotElement.offsetHeight + getViewportHeight();

	config.previousSiblingIndex = config.previousSiblingIndex || 0;

	for (; config.previousSiblingIndex < elements.length; config.previousSiblingIndex += 1) {
		const elementPosition = getTopOffset(elements[config.previousSiblingIndex]);

		if (minimalPosition <= elementPosition) {
			return elements[config.previousSiblingIndex];
		}
	}

	return null;
}

function insertNewSlotPlaceholder(slotName, nextSibling) {
	const placeholder = document.createElement('div');
	placeholder.id = slotName;

	// placeholder.classList.add('repeatable-boxad', 'hide');

	nextSibling.parentNode.insertBefore(placeholder, nextSibling);
}

function repeatSlot(adSlot) {
	if (context.get('options.slotRepeater') && adSlot.isEnabled() && adSlot.isRepeatable()) {
		const newSlotDefinition = adSlot.getCopy();
		const config = newSlotDefinition.repeatable;

		newSlotDefinition.targeting[config.targetingKey] += 1;
		newSlotDefinition.slotName = stringBuilder.build(config.slotNamePattern, {
			slotConfig: newSlotDefinition
		});

		if (config.limit !== null && newSlotDefinition.targeting[config.targetingKey] > config.limit) {
			logger(logGroup, `Limit reached for ${newSlotDefinition.slotName}`);
			return;
		}

		const nextSibling = findNextSibling(adSlot.getElement(), config);

		if (nextSibling) {
			insertNewSlotPlaceholder(newSlotDefinition.slotName, nextSibling);
			context.set(`slots.${newSlotDefinition.slotName}`, newSlotDefinition);
			context.push('events.pushOnScroll.ids', newSlotDefinition.slotName);

			logger(logGroup, 'Repeat slot', newSlotDefinition.slotName);
		}

		logger(logGroup, `There is not enough space for ${newSlotDefinition.slotName}`);
	}
}

class SlotRepeater {
	init() {
		context.push('listeners.slot', {
			onRenderEnded: repeatSlot
		});
	}
}

export const slotRepeater = new SlotRepeater();
