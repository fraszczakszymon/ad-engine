export function throttle(callback, wait) {
	let context,
		previous = 0,
		result,
		timeout;

	return function (...args) {
		const now = Date.now(),
			remaining = wait - (now - previous);

		context = this;

		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}

		// we've waited enough time, call the function
		if (remaining <= 0 || remaining > wait) {
			previous = now;
			result = callback.apply(context, args);
			if (!timeout) {
				context = args = null;
			}
		} else {
			// not enough time has passed, but set a timeout in case this doesn't get called again
			timeout = window.setTimeout(() => {
				result = callback.apply(context, args);
			}, wait);
		}
		return result;
	};
}
