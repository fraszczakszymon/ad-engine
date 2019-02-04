import { context, events } from '../services';

export function setupGptTargeting() {
	const tag = window.googletag.pubads();
	const targeting = context.get('targeting');

	events.on(events.BEFORE_PAGE_CHANGE_EVENT, () => {
		tag.clearTargeting();
	});

	function setTargetingValue(key, value) {
		if (typeof value === 'function') {
			tag.setTargeting(key, value());
		} else {
			tag.setTargeting(key, value);
		}
	}

	Object.keys(targeting).forEach((key) => {
		setTargetingValue(key, targeting[key]);
	});

	context.onChange('targeting', (trigger, value) => {
		const segments = trigger.split('.');
		const key = segments[segments.length - 1];

		setTargetingValue(key, value);
	});
}
