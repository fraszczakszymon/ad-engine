import { UtilsDetectors } from './utils-detectors.page';

class DeviceDetect extends UtilsDetectors {
	constructor() {
		super();
		this.pageLink = 'utils/device-detect/';
		this.messageField = '#device';
	}
}

export const deviceDetect = new DeviceDetect();
