import { UtilsDetectors } from './utils-detectors.page';

class BrowserDetect extends UtilsDetectors {
	constructor() {
		super();
		this.pageLink = 'utils/browser-detect/';
		this.messageField = '#browser';
	}
}

export const browserDetect = new BrowserDetect();
