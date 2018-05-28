export function getTopOffset(element) {
	const elementWindow = element.ownerDocument.defaultView;

	let currentElement = element,
		hideAgain = false,
		topPos = 0;

	if (element.classList.contains('hide')) {
		hideAgain = true;
		element.classList.remove('hide');
	}

	do {
		topPos += currentElement.offsetTop;
		currentElement = currentElement.offsetParent;
	} while (currentElement !== null);

	if (hideAgain) {
		element.classList.add('hide');
	}

	if (elementWindow && elementWindow.frameElement) {
		topPos += getTopOffset(elementWindow.frameElement);
	}

	return topPos;
}

export function getViewportHeight() {
	return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export function isInViewport(element, topOffset = 0, bottomOffset = 0) {
	const alwaysInViewportPositions = ['fixed', 'sticky'],
		elementPosition = window.getComputedStyle(element).position;

	if (alwaysInViewportPositions.includes(elementPosition)) {
		return true;
	}

	const elementHeight = element.offsetHeight,
		elementTop = getTopOffset(element),
		elementBottom = elementTop + elementHeight,
		scrollPosition = window.scrollY,
		viewportHeight = getViewportHeight(),
		viewportTop = topOffset + scrollPosition,
		viewportBottom = bottomOffset + scrollPosition + viewportHeight;

	return elementTop >= (viewportTop - elementHeight / 2) &&
		elementBottom <= (viewportBottom + elementHeight / 2);
}
