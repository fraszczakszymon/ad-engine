import helpers from '../common/helpers';

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
		const queryParameters = [
			`wikia_adapter_timeout=${timeout}`
		];

		if (price !== 0) {
			queryParameters.push(`wikia_adapter=${price}`);
		}
		if (limit !== 0) {
			queryParameters.push(`wikia_adapter_limit=${limit}`);
		}
		if (randomness) {
			queryParameters.push('wikia_adapter_random=1');
		}

		return helpers.addParametersToUrl(this.pageLink, queryParameters);
	}
}

export default new ReusablePrebid();
