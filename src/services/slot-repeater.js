import { context } from './context-service';
import { logger } from '../utils';
import { getTopOffset, getViewportHeight } from '../utils/dimensions';
import { slotService } from './slot-service';
import { stringBuilder } from '../utils/string-builder';

const logGroup = 'slot-repeater';

function findNextSiblingForSlot(previousSlotElement, elements, config) {
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

function insertNewSlotContainer(previousSlotElement, slotName, config, nextSibling) {
	const container = document.createElement('div');
	const additionalClasses = config.additionalClasses || '';

	container.id = slotName;
	container.className = `${previousSlotElement.className} ${additionalClasses}`;

	nextSibling.parentNode.insertBefore(container, nextSibling);
}

function insertFakePlaceholderAfterLastSelector(slotName, elements) {
	const lastElement = elements[elements.length - 1];
	const placeholder = document.createElement('div');

	placeholder.id = slotName;
	placeholder.className = 'hide';

	lastElement.parentNode.insertBefore(placeholder, lastElement.nextSibling);
}

function repeatSlot(adSlot) {
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

	const elements = document.querySelectorAll(config.appendBeforeSelector);
	const nextSibling = findNextSiblingForSlot(adSlot.getElement(), elements, config);

	if (nextSibling) {
		insertNewSlotContainer(adSlot.getElement(), slotName, config, nextSibling);
		context.set(`slots.${slotName}`, newSlotDefinition);
		context.push('events.pushOnScroll.ids', slotName);

		logger(logGroup, 'Repeat slot', slotName);
	} else {
		insertFakePlaceholderAfterLastSelector(slotName, elements, config);
		slotService.disable(slotName, 'viewport-conflict');
		context.push('events.pushOnScroll.ids', slotName);

		logger(logGroup, `There is not enough space for ${slotName}`);
	}
}

class SlotRepeater {
	init() {
		context.push('listeners.slot', {
			onRenderEnded: (adSlot) => {
				if (context.get('options.slotRepeater') && adSlot.isEnabled() && adSlot.isRepeatable()) {
					repeatSlot(adSlot);
				}
			}
		});
	}
}

export const slotRepeater = new SlotRepeater();
