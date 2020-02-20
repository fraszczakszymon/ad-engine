import { UapParams } from '@wikia/ad-engine';
import { DomManipulator } from './dom-manipulator';

export function setResolvedImagesInAd(manipulator: DomManipulator, params: UapParams): void {
	if (params.image2 && params.image2.background) {
		manipulator.element(params.image2.element).removeClass('hidden-state');
	}
}

export function setImpactImagesInAd(manipulator: DomManipulator, params: UapParams): void {
	if (params.image2 && params.image2.background) {
		manipulator.element(params.image1.element).removeClass('hidden-state');
	}
}
