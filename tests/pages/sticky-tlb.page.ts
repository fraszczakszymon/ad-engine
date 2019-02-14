class StickyTlb {
	constructor() {
		this.pageLink = 'templates/sticky-tlb/';
		this.stickedAd = '.sticky-bfaa';
		this.unstickedAd = '.heme-resolved';
		this.classUnstickButton = '.button-unstick';
	}

	isAdSticked() {
		return browser.isExisting(this.stickedAd) && !browser.isExisting(this.unstickedAd);
	}
}

export const stickyTlb = new StickyTlb();
