'use strict';

import {getTopOffset} from '../utils/dimensions';
import {throttle} from '../utils/throttle';

let callbacks = {};

function getUniqueId() {
	return (((1+Math.random())*0x1000000)|0).toString(16).substring(1);
}

function pushSlot(adStack, node) {
	adStack.push({
		id: node.id,
		pageType: node.getAttribute('data-page-type')
	});
}

export default class ScrollListener {
	static init() {
		document.addEventListener('scroll', throttle((event) => {
			Object.keys(callbacks).forEach((id) => {
				if (typeof callbacks[id] === 'function') {
					callbacks[id](event, id);
				}
			});
		}, 100));
	}

	static addSlot(adStack, id, threshold = 0) {
		const node = document.getElementById(id);

		if (!node) {
			return;
		}

		ScrollListener.addCallback(function (event, callbackId) {
			const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop,
				slotPosition = getTopOffset(node),
				viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

			if (scrollPosition + viewPortHeight > slotPosition - threshold) {
				ScrollListener.removeCallback(callbackId);
				pushSlot(adStack, node);
			}
		});
	}

	static addCallback(callback) {
		const id = getUniqueId();
		callbacks[id] = callback;
	}

	static removeCallback(id) {
		delete callbacks[id];
	}
}
