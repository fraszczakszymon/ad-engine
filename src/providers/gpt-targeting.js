import Context from '../services/context-service';

export function setupGptTargeting() {
	const tag = window.googletag.pubads(),
		targeting = Context.get('targeting');

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

	Context.onChange('targeting', (trigger, value) => {
		const segments = trigger.split('.'),
			key = segments[segments.length - 1];

		setTargetingValue(key, value);
	});
}
