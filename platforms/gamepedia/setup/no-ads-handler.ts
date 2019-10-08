import { NoAdsHandler } from '@platforms/shared';
import { hideAllAdSlots } from '../templates/hide-all-ad-slots';

export class GamepediaNoAdsHandler implements NoAdsHandler {
	handleNoAdsScenario(): void {
		hideAllAdSlots();
	}
}
