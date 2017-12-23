export function defer(fn, ...args) {
	if (typeof fn !== 'function') {
		throw new Error('Expected a function.');
	}

	return new Promise((resolve) => {
		setTimeout(() => resolve(fn(...args)), 0);
	});
}
