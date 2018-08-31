class Helpers {
	get gdprModalOverlay() {
		return '[data-tracking-opt-in-overlay="true"]';
	}

	get gdprAccept() {
		return '[data-tracking-opt-in-accept="true"]';
	}

	get gdprReject() {
		return '#incontent_boxad';
	}

	gdprModal(decision = true) {
		if (browser.isVisible(this.gdprModalOverlay)) {
			browser.waitForVisible(this.gdprAccept, 5000);
			if (decision) {
				browser.element(this.gdprAccept).click();
			} else {
				browser.element(this.gdprReject).click();
			}
		} else {
			console.log('Modal not visible');
		}
		browser.waitForVisible(this.gdprModalOverlay, 5000, true);
	}
}

export default new Helpers();
