import { context } from './context-service';
import { logger } from '../utils';
import { getTopOffset, getViewportHeight } from '../utils/dimensions';
import { stringBuilder } from '../utils/string-builder';

const logGroup = 'slot-repeater';

function findNextSibling(previousSlotElement, config) {
	const elements = document.querySelectorAll(config.appendBeforeSelector);
	const minimalPosition = getTopOffset(previousSlotElement) + previousSlotElement.offsetHeight + getViewportHeight();

	config.previousSiblingIndex = config.previousSiblingIndex || 0;

	for (; config.previousSiblingIndex < elements.length; config.previousSiblingIndex += 1) {
		const elementPosition = getTopOffset(elements[config.previousSiblingIndex]);

		if (minimalPosition <= elementPosition) {
			return elements[config.previousSiblingIndex];
		}
	}

	return null;
}

function insertNewSlotPlaceholder(previousSlotElement, slotName, config, nextSibling) {
	const placeholder = document.createElement('div');
	const additionalClasses = config.additionalClasses || '';

	placeholder.id = slotName;
	placeholder.className = `${previousSlotElement.className} ${additionalClasses}`;

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

		const slotName = newSlotDefinition.slotName;

		if (config.limit !== null && newSlotDefinition.targeting[config.targetingKey] > config.limit) {
			logger(logGroup, `Limit reached for ${slotName}`);
			return;
		}

		const nextSibling = findNextSibling(adSlot.getElement(), config);

		if (nextSibling) {
			insertNewSlotPlaceholder(adSlot.getElement(), slotName, config, nextSibling);
			context.set(`slots.${slotName}`, newSlotDefinition);
			context.push('events.pushOnScroll.ids', slotName);

			logger(logGroup, 'Repeat slot', slotName);
		} else {
			logger(logGroup, `There is not enough space for ${slotName}`);
		}
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
