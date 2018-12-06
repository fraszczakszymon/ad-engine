class QueryStrings {
	constructor() {
		this.instantGlobals = {
			labradorTestVariableAlpha: 'InstantGlobals.wgTestVariableAlpha'
		};
		this.utils = {
			resolved: 'resolved_state',
			cb: 'cb',
			price: 'wikia_adapter',
			limit: 'wikia_adapter_limit',
			limitSlots: 'limit',
			contentLength: 'content_length',
			randomness: 'wikia_adapter_random',
			timeout: 'wikia_adapter_timeout',
			sessionId: 'sessionid',
			enabledGeo: 'enabled-geo',
			forceEmptyResponse: 'force-empty-response',
			disableFloating: 'floating'
		};
		this.video = {
			midroll: 'midroll',
			postroll: 'postroll',
			autoplay: 'autoplay',
			mute: 'mute',
			capping: 'capping',
			f15n: 'f15s=eHnTdMot',
			videoAdapter: 'wikia_video_adapter'
		};
	}

	/**
	 * Adds additional parameters to URL.
	 * @param {string} url - base URL
	 * @param {...string} parameters
	 * @returns {string} given URL with added parameters
	 */
	getUrl(url, ...parameters) {
		return `${url}?${parameters.join('&')}`;
	}

	getIGParameters(country = 'XX', percent = null, additional = null) {
		if (percent) {
			if (additional) {
				return `[${country}/${percent}${additional}]`;
			}
			return `[${country}/${percent}]`;
		}
		return `[${country}]`;
	}

	/**
	 * @private
	 * @param {boolean} param
	 * @returns {string}
	 */
	getIsOn(param) {
		return param ? '1' : '0';
	}

	getMidroll(midroll) {
		return `${this.video.midroll}=${this.getIsOn(midroll)}`;
	}

	getPostroll(postroll) {
		const on = postroll ? '1' : '0';

		return `${this.video.postroll}=${on}`;
	}

	getAutoplay(autoplay) {
		const on = autoplay ? '1' : '0';

		return `${this.video.autoplay}=${on}`;
	}

	getMute(mute) {
		const on = mute ? '1' : '0';

		return `${this.video.mute}=${on}`;
	}

	getCapping(capping) {
		return `${this.video.mute}=${capping}`;
	}

	getF15n() {
		return `${this.video.f15n}`;
	}

	getCacheBuster(cb = Date.now()) {
		return `${this.utils.cb}=${cb}`;
	}

	getPrice(price) {
		return `${this.utils.price}=${price}`;
	}

	getLimit(limit) {
		return `${this.utils.limit}=${limit}`;
	}

	getLimitOfSlots(limit = 3) {
		return `${this.utils.limitSlots}=${limit}`;
	}

	getTimeout(timeout) {
		return `${this.utils.timeout}=${timeout}`;
	}

	getLengthOfContent(lengthNumber = 5) {
		return `${this.utils.contentLength}=${lengthNumber}`;
	}

	getRandom(randomness) {
		const on = randomness ? '1' : '0';
		return `${this.utils.randomness}=${on}`;
	}

	getResolvedState(resolved) {
		const on = resolved ? '1' : '0';
		return `${this.utils.resolved}=${on}`;
	}

	getSessionIdParam(parameter) {
		return `${this.utils.sessionId}=${parameter}`;
	}

	constructInstantGlobal(wg, country = 'XX', percent = null, additional = null) {
		return `${wg}=${this.getIGParameters(country, percent, additional)}`;
	}

	constructSingleGeoInstantGlobal(country = 'XX', percent = null) {
		return `${this.utils.enabledGeo}=${country}/${percent}`;
	}
}

export const queryStrings = new QueryStrings();
