class StickyAd {
	constructor() {
		this.pageLink = 'templates/sticky-ad/';
		this.classStickyTemplate = '.sticky-template';
		this.classStickySlot = '.sticky-slot';
		this.classUnstickButton = '.button-unstick';
		this.unstickTime = 3500;
		this.unstickAnimationTime = 600;
	}
}

export default new StickyAd();
