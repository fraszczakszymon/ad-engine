import ScrollListener from '../listeners/scroll-listener';
import { isInViewport } from './dimensions';

function updateInViewport(listener) {
	const newInViewport = isInViewport(listener.element);

	if (newInViewport !== listener.inViewport) {
		listener.callback(newInViewport);
		listener.inViewport = newInViewport;
	}
}

function addListener(element, callback, params = {}) {
	const listener = {
			element,
			callback,
			offsetTop: params.offsetTop || 0,
			offsetBottom: params.offsetBottom || 0,
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
