'use strict';

export function throttle(func, wait) {
	let timeout, context, args, result;
	let previous = 0;

	return function() {
		let now = Date.now();
		let remaining = wait - (now - previous);
		context = this;
		args = arguments;

		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}

		// we've waited enough time, call the function
		if (remaining <= 0 || remaining > wait) {
			previous = now;
			result = func.apply(context, args);
			if (!timeout) {
				context = args = null;
			}
		} else {
			// not enough time has passed, but set a timeout in case this doesn't get called again
			timeout = window.setTimeout(function () {
				result = func.apply(context, args);
			}, wait);
		}
		return result;
	};
}
