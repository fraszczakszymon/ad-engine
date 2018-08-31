import { timeouts } from '../common/timeouts';

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

	get fandomLayout() {
		return '.feed-layout';
	}

	gdprModal(decision = true) {
		if (browser.isVisible(this.gdprModalOverlay)) {
			browser.waitForVisible(this.gdprAccept, timeouts.standard);
			if (decision) {
				browser.element(this.gdprAccept).click();
			} else {
				browser.element(this.gdprReject).click();
			}
		} else {
			console.log('Modal not visible');
		}
		browser.waitForVisible(this.gdprModalOverlay, timeouts.standard, true);
	}
}

export default new Helpers();
