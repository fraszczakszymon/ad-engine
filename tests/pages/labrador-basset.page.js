class LabradorBassetPage {
	constructor() {
		this.pageLink = 'utils/labrador-basset/';
		this.ig = 'InstantGlobals.wgTestVariableAlpha=';
		this.instantGlobalCached = '-cached';
		this.sessionID = 'sessionid=';
		this.wgVariablesStatuses = '#statuses';
	}

	sessionIdParam(param) {
		return this.sessionID + param;
	}

	returnIGParameters(country = 'XX', percent = null, additional = null) {
		if (percent) {
			if (additional) {
				return `[${country}/${percent}${additional}]`;
			}
			return `[${country}/${percent}]`;
		}
		return `[${country}]`;
	}
}

export default new LabradorBassetPage();
