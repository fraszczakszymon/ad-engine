export function once(eventTarget, eventName, options = {}) {
	return new Promise((resolve, reject) => {
		if (
			!eventTarget ||
			typeof eventTarget.addEventListener !== 'function'
		) {
			reject('EventTarget does not have addEventListener method');
		}

		if (typeof options === 'boolean') {
			options = { capture: options };
		}

		eventTarget.addEventListener(eventName, resolve, Object.assign({}, options, { once: true }));
	});
}
