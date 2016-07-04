'use strict';

export function getTopOffset(el) {
	let topPos = 0;
	for (; el !== null; el = el.offsetParent) {
		topPos += el.offsetTop;
	}

	return topPos;
}
