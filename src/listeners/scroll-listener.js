import { getTopOffset } from '../utils/dimensions';

const callbacks = {};
const throttledCallbacks = {};

function getUniqueId() {
	return ((1 + Math.random()) * 0x1000000).toString(16).substring(1);
}

function pushSlot(adStack, node) {
	adStack.push({
		id: node.id
	});
}

export default class ScrollListener {
	static init() {
		document.addEventListener('scroll', (event) => {
			Object.keys(callbacks).forEach((id) => {
				callbacks[id](event, id);
			});

			window.requestAnimationFrame(() => {
				Object.keys(throttledCallbacks).forEach((id) => {
					throttledCallbacks[id](event, id);
				});
			});
		});
	}

	static addSlot(adStack, id, threshold = 0) {
		const node = document.getElementById(id);

		if (!node) {
			return;
		}

		ScrollListener.addCallback((event, callbackId) => {
			const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
				slotPosition = getTopOffset(node),
				viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

			if (scrollPosition + viewPortHeight > slotPosition - threshold) {
				ScrollListener.removeCallback(callbackId);
				pushSlot(adStack, node);
			}
		});
	}

	static addCallback(callback, throttle = true) {
		const id = getUniqueId();

		(throttle ? throttledCallbacks : callbacks)[id] = callback;

		return id;
	}

	static removeCallback(id) {
		if (callbacks[id]) {
			delete callbacks[id];
		} else {
			delete throttledCallbacks[id];
		}
	}
}
