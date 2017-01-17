import ScrollListener from '../listeners/scroll-listener';
import { isInViewport } from './dimensions';

function updateInViewport(listener) {
	var newInViewport = isInViewport(listener.element);

	if (newInViewport !== listener.inViewport) {
		listener.callback(newInViewport);
		listener.inViewport = newInViewport;
	}
}

function addListener(element, callback) {
	const listener = {
			element,
			callback,
			inViewport: false
		},
		updateCallback = () => {
			updateInViewport(listener);
		};

	listener.id = ScrollListener.addCallback(updateCallback);
	updateCallback();

	return listener.id;
}

function removeListener(listenerId) {
	ScrollListener.removeCallback(listenerId);
}

export default {
	addListener,
	removeListener
};
