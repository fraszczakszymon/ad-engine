import { context, events, eventService } from '../services';
import { gptFactory } from './gpt-factory';

export async function setupGptTargeting(): Promise<void> {
	const gpt = await gptFactory.init();
	const tag = gpt.pubads();
	const targeting = context.get('targeting') || {};

	function setTargetingValue(
		key: string,
		value: string | string[] | (() => string | string[]),
	): void {
		if (typeof value === 'undefined' || value === null) {
			tag.clearTargeting(key);
		} else if (typeof value === 'function') {
			tag.setTargeting(key, value());
		} else {
			tag.setTargeting(key, value);
		}
	}

	function setTargetingFromContext(): void {
		Object.keys(targeting).forEach((key) => {
			setTargetingValue(key, targeting[key]);
		});
	}

	eventService.on(events.PAGE_CHANGE_EVENT, () => {
		setTargetingFromContext();
	});

	setTargetingFromContext();

	context.onChange('targeting', (trigger, value) => {
		const segments = trigger.split('.');
		const key = segments[segments.length - 1];

		setTargetingValue(key, value);
	});
}
