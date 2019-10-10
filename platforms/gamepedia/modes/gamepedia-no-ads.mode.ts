import { NoAdsMode } from '@platforms/shared';
import { hideAllAdSlots } from '../templates/hide-all-ad-slots';

export class GamepediaNoAdsMode implements NoAdsMode {
	handleNoAds(): void {
		hideAllAdSlots();
	}
}
