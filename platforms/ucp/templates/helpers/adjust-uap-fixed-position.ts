import { setStyles, StylesResult } from './set-styles';

export type UapPositionStyles = StylesResult<{
	adElement: HTMLElement;
	body: HTMLElement;
	navbarElement: HTMLElement;
}>;

export function adjustUapFixedPosition(
	adElement: HTMLElement,
	navbarElement: HTMLElement,
): UapPositionStyles {
	const adHeight = adElement.offsetHeight;
	const adAndNavHeight = adHeight + navbarElement.offsetHeight;

	const elements = { adElement, navbarElement, body: document.body };
	const styles = {
		adElement: {
			position: 'fixed',
			top: '0',
		},
		navbarElement: {
			position: 'fixed',
			top: `${adHeight}px`,
		},
		body: {
			paddingTop: `${adAndNavHeight}px`,
		},
	};

	return setStyles(elements, styles);
}

export function restoreUapPosition(
	adElement: HTMLElement,
	navbarElement: HTMLElement,
	styles: UapPositionStyles,
): UapPositionStyles {
	const elements = { adElement, navbarElement, body: document.body };

	return setStyles(elements, styles);
}
