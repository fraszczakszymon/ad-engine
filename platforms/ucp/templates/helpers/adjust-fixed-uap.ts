export function adjustFixedUap(adElement: HTMLElement, navbarElement: HTMLElement): void {
	const adHeight = adElement.offsetHeight;
	const aAdAndNavHeight = adHeight + navbarElement.offsetHeight;

	adElement.style.setProperty('position', 'fixed');
	adElement.style.setProperty('top', '0');
	navbarElement.style.setProperty('position', 'fixed');
	navbarElement.style.setProperty('width', '100%');
	navbarElement.style.setProperty('top', `${adHeight}px`);
	document.body.style.paddingTop = `${aAdAndNavHeight}px`;
}
