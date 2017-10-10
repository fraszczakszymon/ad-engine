export function once(object, eventName, ...args) {
	return new Promise((resolve, reject) => {
		if (
			!object ||
			typeof object.addEventListener !== 'function' ||
			typeof object.removeEventListener !== 'function'
		) {
			reject('Object does not have a proper interface');
		}

		function onEvent(...eventArgs) {
			object.removeEventListener(eventName, onEvent);
			resolve.apply(this, eventArgs);
		}

		object.addEventListener(eventName, onEvent, ...args);
	});
}
