const contextObject = {
		adUnitId: '',
		events: {},
		delayModules: [],
		listeners: {
			porvata: [],
			slot: []
		},
		options: {
			customAdLoader: {
				globalMethodName: 'loadCustomAd'
			},
			maxDelayTimeout: 2000,
			video: {
				moatTracking: {
					enabled: true,
					partnerCode: 'wikiaimajsint377461931603',
					sampling: 1
				}
			},
			trackingOptOut: false,
			trackingOptOutBlacklist: {
				gpt: true
			}
		},
		slots: {},
		src: 'gpt',
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
	let seg = contextObject,
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

class Context {
	constructor() {
		this.__useDefault = true;
	}

	extend(newContext) {
		Object.assign(contextObject, newContext);
	}

	set(key, value) {
		segment(key, value);
	}

	get(key) {
		return segment(key);
	}

	push(key, value) {
		const array = segment(key);

		if (array) {
			array.push(value);
		}
	}

	onChange(key, callback) {
		onChangeCallbacks[key] = onChangeCallbacks[key] || [];
		onChangeCallbacks[key].push(callback);
	}
}

export const context = new Context();
