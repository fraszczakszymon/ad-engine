class Krux {
	constructor() {
		this.pageLink = 'services/krux/';
		this.idField = '#user';
		this.segmentsField = '#segments';
	}

	getUserID() {
		return browser.getText(this.idField);
	}

	getSegments() {
		return browser.getText(this.segmentsField);
	}
}

export const krux = new Krux();
