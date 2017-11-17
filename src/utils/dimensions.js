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

export function isInViewport(element, topOffset = 0, bottomOffset = 0) {
	if (window.getComputedStyle(element).position === 'fixed') {
		return true;
	}

	const elementHeight = element.offsetHeight,
		elementTop = getTopOffset(element),
		elementBottom = elementTop + elementHeight,
		scrollPosition = window.scrollY,
		viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		viewportTop = topOffset + scrollPosition,
		viewportBottom = bottomOffset + scrollPosition + viewportHeight;

	return elementTop >= (viewportTop - elementHeight / 2) &&
		elementBottom <= (viewportBottom + elementHeight / 2);
}
