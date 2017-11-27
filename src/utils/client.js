import MobileDetect from 'mobile-detect';

const appName = window.navigator.appName,
	appVersion = window.navigator.appVersion,
	userAgent = window.navigator.userAgent;

let browser = null,
	mobileDetect = null,
	operatingSystem = null;

function getMobileDetect() {
	if (mobileDetect === null) {
		mobileDetect = new MobileDetect(userAgent);
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

	static getOperatingSystem() {
		if (operatingSystem !== null) {
			return operatingSystem;
		}

		operatingSystem = 'unknown';
		if (userAgent.indexOf('Win') !== -1) {
			operatingSystem = 'Windows';
		}
		if (userAgent.indexOf('Mac') !== -1) {
			operatingSystem = 'OSX';
		}
		if (userAgent.indexOf('Linux') !== -1) {
			operatingSystem = 'Linux';
		}
		if (userAgent.indexOf('Android') !== -1) {
			operatingSystem = 'Android';
		}
		if (userAgent.indexOf('like Mac') !== -1) {
			operatingSystem = 'iOS';
		}

		return operatingSystem;
	}

	static getBrowser() {
		if (browser !== null) {
			return browser;
		}

		let temp,
			matches = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

		if (/trident/i.test(matches[1])) {
			temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
			browser = `IE ${(temp[1] || '')}`;
			return browser;
		}
		if (matches[1] === 'Chrome') {
			temp= userAgent.match(/\b(OPR|Edge)\/(\d+)/);
			if (temp !== null) {
				browser = temp.slice(1).join(' ').replace('OPR', 'Opera');
				return browser;
			}
		}

		matches = matches[2] ? [matches[1], matches[2]] : [appName, appVersion, '-?'];
		temp = userAgent.match(/version\/(\d+)/i);
		if (temp !== null) {
			matches.splice(1, 1, temp[1]);
		}
		browser = matches.join(' ');

		return browser;
	}
}
