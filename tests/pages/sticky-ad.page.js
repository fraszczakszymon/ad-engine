import { adSlots } from '../common/ad-slots';

class StickyAd {
	constructor() {
		this.pageLink = 'templates/sticky-ad/';
		this.classStickyTemplate = '.sticky-template';
		this.classStickySlot = '.sticky-slot';
		this.classUnstickButton = '.button-unstick';
		this.stickedSlot = `${adSlots.topLeaderboard}${this.classStickyTemplate}${this.classStickySlot}`;
	}
}

export const stickyAd = new StickyAd();
