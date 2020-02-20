import { AdSlot } from '@wikia/ad-engine';
import { calculateAdHeight } from './calculate-ad-height';
import { DomManipulator } from './dom-manipulator';

export function setAdHeight(manipulator: DomManipulator, adSlot: AdSlot, ratio: number): void {
	const adHeight = calculateAdHeight(ratio);

	manipulator.element(adSlot.getElement()).setProperty('height', `${adHeight}px`);
}
