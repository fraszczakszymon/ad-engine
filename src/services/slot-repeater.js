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

function buildString(pattern, definition) {
	return stringBuilder.build(pattern, {
		slotConfig: definition
	});
}

function repeatSlot(adSlot) {
	const newSlotDefinition = adSlot.getCopy();
	const repeatConfig = newSlotDefinition.repeat;

	repeatConfig.index += 1;

	const slotName = buildString(repeatConfig.slotNamePattern, newSlotDefinition);
	newSlotDefinition.slotName = slotName;

	if (repeatConfig.limit !== null && repeatConfig.index > repeatConfig.limit) {
		logger(logGroup, `Limit reached for ${slotName}`);

		return false;
	}

	context.set(`slots.${slotName}`, newSlotDefinition);
	if (repeatConfig.updateProperties) {
		Object.keys(repeatConfig.updateProperties).forEach((key) => {
			const value = buildString(repeatConfig.updateProperties[key], newSlotDefinition);

			context.set(`slots.${slotName}.${key}`, value);
		});
	}

	const elements = document.querySelectorAll(repeatConfig.insertBeforeSelector);
	const nextSibling = findNextSiblingForSlot(adSlot.getElement(), elements, repeatConfig);

	if (nextSibling) {
		insertNewSlotContainer(adSlot.getElement(), slotName, repeatConfig, nextSibling);
		context.push('events.pushOnScroll.ids', slotName);

		logger(logGroup, 'Repeat slot', slotName);

		return true;
	}

	insertFakePlaceholderAfterLastSelector(slotName, elements, repeatConfig);
	slotService.disable(slotName, 'viewport-conflict');
	context.push('events.pushOnScroll.ids', slotName);

	logger(logGroup, `There is not enough space for ${slotName}`);

	return false;
}

class SlotRepeater {
	init() {
		if (context.get('options.slotRepeater')) {
			context.push('listeners.slot', {
				onRenderEnded: (adSlot) => {
					if (adSlot.isEnabled() && adSlot.isRepeatable()) {
						return repeatSlot(adSlot);
					}

					return false;
				}
			});
		}
	}
}

export const slotRepeater = new SlotRepeater();
