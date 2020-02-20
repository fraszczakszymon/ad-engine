import { DomManipulator } from './dom-manipulator';

export function adjustUapFixedPosition(
	manipulator: DomManipulator,
	adElement: HTMLElement,
	navbarElement: HTMLElement,
): void {
	const adHeight = adElement.offsetHeight;
	const aAdAndNavHeight = adHeight + navbarElement.offsetHeight;

	manipulator
		.element(adElement)
		.setProperty('position', 'fixed')
		.setProperty('top', '0');
	manipulator
		.element(navbarElement)
		.setProperty('position', 'fixed')
		.setProperty('top', `${adHeight}px`);
	manipulator.element(document.body).setProperty('paddingTop', `${aAdAndNavHeight}px`);
}
