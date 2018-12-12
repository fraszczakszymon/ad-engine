class Moat {
	constructor() {
		this.pageLink = 'services/moat-yi/';
		this.pageParams = '#pageParams';
	}

	getPageLevelParams() {
		return browser.getText(this.pageParams);
	}
}

export const moat = new Moat();
