import MobileDetect from 'mobile-detect';

let mobileDetect = null;

function getMobileDetect() {
	if (mobileDetect === null) {
		mobileDetect = new MobileDetect(window.navigator.userAgent);
	}

	return mobileDetect;
}

export default class Client {
	static isSmartphone() {
		const device = getMobileDetect();

		return device.mobile();
	}

	static isTablet() {
		const device = getMobileDetect();

		return device.tablet();
	}

	static isDesktop() {
		return !Client.isSmartphone() && !Client.isTablet();
	}

	static getDeviceType() {
		if (Client.isTablet()) {
			return 'tablet';
		} else if (Client.isSmartphone()) {
			return 'smartphone';
		}

		return 'desktop';
	}
}
