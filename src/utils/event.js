export function once(element, eventName, ...args) {
	return new Promise((resolve) => {
		function onEvent(...eventArgs) {
			resolve.apply(this, eventArgs);
			element.removeEventListener(eventName, onEvent);
		}

		element.addEventListener(eventName, onEvent, ...args);
	});
}
