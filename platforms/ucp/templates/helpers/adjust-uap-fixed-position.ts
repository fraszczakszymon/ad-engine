import { StylesManager } from './styles-manager';

export function adjustUapFixedPosition(
	manager: StylesManager,
	adElement: HTMLElement,
	navbarElement: HTMLElement,
): void {
	const adHeight = adElement.offsetHeight;
	const aAdAndNavHeight = adHeight + navbarElement.offsetHeight;

	manager
		.element(adElement)
		.property('position', 'fixed')
		.property('top', '0');
	manager
		.element(navbarElement)
		.property('position', 'fixed')
		.property('top', `${adHeight}px`);
	manager.element(document.body).property('paddingTop', `${aAdAndNavHeight}px`);
}
