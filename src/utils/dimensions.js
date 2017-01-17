export function getTopOffset(element) {
	let topPos = 0,
		elementWindow = element.ownerDocument.defaultView || element.ownerDocument.parentWindow;

	do {
		topPos += element.offsetTop;
		element = element.offsetParent;
	} while (element !== null);

	if (elementWindow.frameElement) {
		topPos += getTopOffset(elementWindow.frameElement);
	}

	return topPos;
}

export function isInViewport(element, topOffset = 0, bottomOffset = 0) {
	const elementHeight = element.offsetHeight,
		elementTop = getTopOffset(element),
		elementBottom = elementTop + elementHeight,
		scrollPosition = window.scrollY,
		viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		viewportTop = topOffset + scrollPosition,
		viewportBottom = bottomOffset + scrollPosition + viewportHeight;

	return elementTop >= (viewportTop - elementHeight/2) &&
		elementBottom <= (viewportBottom + elementHeight/2);
}
