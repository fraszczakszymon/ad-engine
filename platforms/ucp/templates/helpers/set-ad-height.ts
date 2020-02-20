import { AdSlot, UapRatio } from '@wikia/ad-engine';
import { calculateAdHeight } from './calculate-ad-height';
import { DomManipulator } from './dom-manipulator';

export function setAdHeight(manipulator: DomManipulator, adSlot: AdSlot, ratio: number): void {
	const adHeight = calculateAdHeight(ratio);

	manipulator.element(adSlot.getElement()).setProperty('height', `${adHeight}px`);
}

export function setImpactAdHeight(
	manipulator: DomManipulator,
	adSlot: AdSlot,
	ratios: UapRatio,
): void {
	const maxAdHeight = calculateAdHeight(ratios.default);
	const minAdHeight = calculateAdHeight(ratios.resolved);
	const offset = window.scrollY || window.pageYOffset || 0;
	let adHeight = maxAdHeight - offset;

	if (adHeight < minAdHeight) {
		adHeight = minAdHeight;
	}

	manipulator.element(adSlot.getElement()).setProperty('height', `${adHeight}px`);
}
