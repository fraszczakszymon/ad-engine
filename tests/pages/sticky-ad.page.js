import adSlots from '../common/ad-slots';
import { timeouts } from '../common/timeouts';

class StickyAd {
	constructor() {
		this.pageLink = 'templates/sticky-ad/';
		this.classStickyTemplate = '.sticky-template';
		this.classStickySlot = '.sticky-slot';
		this.classUnstickButton = '.button-unstick';
		this.stickedSlot = `${adSlots.topLeaderboard}${this.classStickyTemplate}${this.classStickySlot}`;
		this.unstickTime = timeouts.viewabillity + 2000;
	}
}

export default new StickyAd();
