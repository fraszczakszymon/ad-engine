export function getTopOffset(element) {
	const bounding = element.getBoundingClientRect(),
		scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

	return bounding.top + scrollPosition;
}
