/** Return passed promise and executes callback if present. */
export function bindCallback(callback, promise) {
	if (callback && typeof callback === 'function') {
		promise.then(callback.bind(null, null), callback);
	}
	return promise;
}
