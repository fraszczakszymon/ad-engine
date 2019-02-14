import { timeouts } from '../common/timeouts';

class BillTheLizard {
	constructor() {
		this.pageLink = 'services/bill-the-lizard/';
		this.lastCallStatus = '#status';
		this.lastCallPredictions = '#predictions';
		this.serialized = '#serialized';
		this.targeting = '#targeting';
		this.allPredictions = '#predictions-all';
		this.allStatuses = '#status-all';

		this.projects = {
			queenOfHears: 'queen_of_hearts',
			cheshireCat: 'cheshirecat',
		};

		this.lazyCallCheshireCatButton = '#lazyCallCat';
		this.lazyCallCheshireCatWithIdButton = '#lazyCallCatWithId';
	}

	getLastCallStatus() {
		return browser.getText(this.lastCallStatus);
	}

	getLastCallPredictions() {
		return browser.getText(this.lastCallPredictions);
	}

	getSerializedValue() {
		return browser.getText(this.serialized);
	}

	getTargetingValue() {
		return browser.getText(this.targeting);
	}

	getAllPredictions() {
		return browser.getText(this.allPredictions);
	}

	getAllStatuses() {
		return browser.getText(this.allStatuses);
	}

	lazyLoadCheshireCat() {
		browser.waitForEnabled(this.lazyCallCheshireCatButton, timeouts.standard);
		browser.click(this.lazyCallCheshireCatButton);
	}

	lazyLoadCheshireCatWithId() {
		browser.waitForEnabled(this.lazyCallCheshireCatWithIdButton, timeouts.standard);
		browser.click(this.lazyCallCheshireCatWithIdButton);
	}
}

export const billTheLizard = new BillTheLizard();
