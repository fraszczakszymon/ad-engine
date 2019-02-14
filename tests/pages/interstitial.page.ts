class Interstitial {
	constructor() {
		this.pageLink = 'templates/interstitial/';
		this.outOfPageWrapper = '.out-of-page-template';
		this.advertisementLabel = `${this.outOfPageWrapper}.interstitial > .button-close`;
		this.closeButton = `${this.outOfPageWrapper}.interstitial > .button-close`;
		this.stopScrolling = '.stop-scrolling';
	}
}

export const interstitial = new Interstitial();
