import queryStrings from '../common/query-strings';

class ReusablePrebid {
	constructor() {
		this.pageLink = 'bidders/reusable-prebid/';
	}

	/**
	 * Builds page link with debug parameters for prebid wikia adapter
	 * @param {number} price
	 * @param {number} limit
	 * @param {boolean} randomness
	 * @param {number} timeout
	 * @returns {string} built url
	 */
	getLinkWithWikiaAdapterParameters(price = 0, limit = 0, randomness = false, timeout = 0) {
		return queryStrings.getUrl(
			this.pageLink,
			queryStrings.getPrice(price),
			queryStrings.getLimit(limit),
			queryStrings.getRandom(randomness),
			queryStrings.getTimeout(timeout)
		);
	}
}

export default new ReusablePrebid();
