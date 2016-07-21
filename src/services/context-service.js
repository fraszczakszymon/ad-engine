'use strict';

let context = {
		adUnitId: '',
		events: {},
		slots: {},
		state: {
			adStack: [],
			isMobile: false
		},
		targeting: {},
		vast: {
			size: [640, 480],
			adUnitId: ''
		}
	},
	onChangeCallbacks = {};

function runCallbacks(trigger, key, newValue) {
	if (!onChangeCallbacks[trigger]) {
		return;
	}

	onChangeCallbacks[trigger].forEach((callback) => {
		callback(key, newValue);
	})
}

function triggerOnChange(key, segments, newValue) {
	let trigger = '';
	segments.forEach((segment) => {
		trigger += (trigger === '' ? '' : '.') + segment;
		runCallbacks(trigger, key, newValue);
	});
}

function segment(key, newValue) {
	const segments = key.split('.'),
		segmentsCount = segments.length;
	let segment = context,
		lastKey = null;

	for (let i = 0; i < segmentsCount; i++) {
		lastKey = segments[i];
		if (i < segmentsCount - 1) {
			segment[lastKey] = segment[lastKey] || {};
			segment = segment[lastKey];
		}
	}

	if (newValue !== undefined) {
		segment[lastKey] = newValue;
		triggerOnChange(key, segments, newValue);
	}

	return segment[lastKey];
}

export default {
	extend(newContext) {
		Object.assign(context, newContext);
	},

	set(key, value) {
		segment(key, value);
	},

	get(key) {
		return segment(key);
	},

	onChange(key, callback) {
		onChangeCallbacks[key] = onChangeCallbacks[key] || [];
		onChangeCallbacks[key].push(callback);
	}
};
