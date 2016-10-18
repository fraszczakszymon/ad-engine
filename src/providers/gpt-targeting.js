import Context from '../services/context-service';

export function setupGptTargeting() {
	const tag = window.googletag.pubads(),
		targeting = Context.get('targeting');

	Object.keys(targeting).forEach((key) => {
		tag.setTargeting(key, targeting[key]);
	});

	Context.onChange('targeting', (trigger, value) => {
		const segments = trigger.split('.'),
			key = segments[segments.length - 1];

		tag.setTargeting(key, value);
	});
}
