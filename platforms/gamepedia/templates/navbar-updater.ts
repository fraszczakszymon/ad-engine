import { resolvedState } from '@wikia/ad-engine';

const lockedStateClass = 'theme-locked';
export const navbarStickClass = 'bfaa-pinned';

/**
 * Checks and returns page navigation bar height
 */
export function getNavbarHeight(navbar: HTMLElement | null): number {
	return navbar ? navbar.clientHeight : 0;
}

/**
 * Pins navbar element
 */
export function pinNavbar(navbar: HTMLElement): void {
	navbar.classList.add(navbarStickClass);
}

/**
 * Unpins navbar element
 */
export function unpinNavbar(navbar: HTMLElement): void {
	navbar.classList.remove(navbarStickClass);
}

/**
 * Checks weather element is in viewport
 */
export function isElementInViewport(adSlot, params): boolean {
	const position = window.scrollY || window.pageYOffset || 0;
	const container = adSlot.getElement();

	if (params.config && params.config.aspectRatio) {
		const { resolved, default: _default } = params.config.aspectRatio;
		const isResolved =
			resolvedState.isResolvedState(params) || container.classList.contains(lockedStateClass);

		return position <= document.body.offsetWidth / (isResolved ? resolved : _default);
	}

	return position <= container.offsetHeight;
}
