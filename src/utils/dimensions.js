/**
 * Returns element's offset of given element from the top of the page
 * @param element DOM element
 * @returns {number}
 */
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

/**
 * Returns client's viewport height
 * @returns {number}
 */
export function getViewportHeight() {
	return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

/**
 * Checks whether given element is in the viewport
 * @param element DOM element that is going to be checked
 * @param topOffset top offset that defines top margin of viewport, may be used to exclude navbar
 * @param bottomOffset bottom offset that defines bottom margin of viewport
 * @param areaThreshold element area that needs to be in/outside viewport to decide whether element is in the viewport
 * @returns {boolean}
 */
export function isInViewport(element, topOffset = 0, bottomOffset = 0, areaThreshold = 0.5) {
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
		viewportBottom = bottomOffset + scrollPosition + viewportHeight,
		minimumElementArea = areaThreshold * elementHeight;

	return elementTop >= (viewportTop - minimumElementArea) &&
		elementBottom <= (viewportBottom + minimumElementArea);
}
