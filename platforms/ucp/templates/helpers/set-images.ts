import { AdSlot, UapParams, universalAdPackage } from '@wikia/ad-engine';

export function setResolvedImagesInAd(adSlot: AdSlot, params: UapParams): void {
	adSlot.getElement().classList.add(universalAdPackage.CSS_CLASSNAME_THEME_RESOLVED);

	if (params.image2 && params.image2.background) {
		params.image2.element.classList.remove('hidden-state');
		params.image1.element.classList.add('hidden-state');
	} else {
		params.image1.element.classList.remove('hidden-state');
	}
}

export function setImpactImagesInAd(adSlot: AdSlot, params: UapParams): void {
	adSlot.getElement().classList.add(universalAdPackage.CSS_CLASSNAME_THEME_RESOLVED);

	if (params.image2 && params.image2.background) {
		params.image2.element.classList.add('hidden-state');
		params.image1.element.classList.remove('hidden-state');
	} else {
		params.image1.element.classList.remove('hidden-state');
	}
}
