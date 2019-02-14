import { timeouts } from '../common/timeouts';

export class UtilsDetectors {
	constructor() {
		this.pageLink = 'utils/';
		this.messageField = '';
	}

	checkIfMessageLoaded(message) {
		return !message.includes('Waiting');
	}

	waitForDetectorToLoad() {
		browser.waitUntil(
			() => this.checkIfMessageLoaded(browser.getText(this.messageField)),
			timeouts.standard,
		);
	}

	getDetectorResponse() {
		browser.waitForExist(this.messageField, timeouts.standard);
		this.waitForDetectorToLoad();

		return browser.getText(this.messageField);
	}
}

export const utilsDetectors = new UtilsDetectors();
