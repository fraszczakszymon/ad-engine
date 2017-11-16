import Context from '../services/context-service';

function isMobileBreakpoint() {
	return Context.get('state.isMobile');
}

export default class Client {
	static isMobileDevice() {
		const userAgent = window.navigator.userAgent;

		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
	}

	static isSmartphone() {
		return Client.isMobileDevice() && isMobileBreakpoint();
	}

	static isTablet() {
		return Client.isMobileDevice() && !isMobileBreakpoint();
	}

	static isDesktop() {
		return !Client.isMobileDevice() && !Client.isTablet();
	}

	static getDeviceType() {
		if (Client.isSmartphone()) {
			return 'smartphone';
		} else if (Client.isTablet()) {
			return 'tablet';
		}

		return 'desktop';
	}
}
