const context = {
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
	});
}

function triggerOnChange(key, segments, newValue) {
	let trigger = '';
	segments.forEach((seg) => {
		trigger += (trigger === '' ? '' : '.') + seg;
		runCallbacks(trigger, key, newValue);
	});
}

function segment(key, newValue) {
	const segments = key.split('.'),
		segmentsCount = segments.length;
	let seg = context,
		lastKey = null;

	for (let i = 0; i < segmentsCount; i += 1) {
		lastKey = segments[i];
		if (i < segmentsCount - 1) {
			seg[lastKey] = seg[lastKey] || {};
			seg = seg[lastKey];
		}
	}

	if (newValue !== undefined) {
		seg[lastKey] = newValue;
		triggerOnChange(key, segments, newValue);
	}

	return seg[lastKey];
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
