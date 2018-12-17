import { UtilsDetectors } from './utils-detectors.page';

class BlockDetect extends UtilsDetectors {
	constructor() {
		super();
		this.pageLink = 'utils/block-detect/';
		this.messageField = '#checked';
	}
}

export const blockDetect = new BlockDetect();
