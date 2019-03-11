import { getAdapters } from './adapters-registry';
import { Prebid } from './index';

const DEFAULT_MAX_CPM = 20;
const videoBiddersCap50 = ['appnexusAst', 'rubicon', 'wikiaVideo']; // bidders with $50 cap

function isValidPrice(bid) {
	return bid.getStatusCode && bid.getStatusCode() === Prebid.validResponseStatusCode;
}

/**
 * Round cpm to predefined values.
 *
 * @param {number} cpm
 * @param {number} maxCpm
 * @returns {number}
 */
function roundCpm(cpm, maxCpm) {
	let result = Math.floor(maxCpm);

	if (cpm === 0) {
		result = 0.0;
	} else if (cpm < 0.05) {
		result = 0.01;
	} else if (cpm < 5.0) {
		result = Math.floor(cpm * 20) / 20;
	} else if (cpm < 10.0) {
		result = Math.floor(cpm * 10) / 10;
	} else if (cpm < 20.0) {
		result = Math.floor(cpm * 2) / 2;
	} else if (cpm < maxCpm) {
		result = Math.floor(cpm);
	}

	return result;
}

/**
 * Round cpm to predefined values and transform to String with 2 decimal places.
 *
 * @param {number} cpm
 * @param {number} maxCpm
 * @returns {string}
 */
export function transformPriceFromCpm(cpm, maxCpm = DEFAULT_MAX_CPM) {
	maxCpm = Math.max(maxCpm, DEFAULT_MAX_CPM);

	return roundCpm(cpm, maxCpm).toFixed(2);
}

/**
 *
 * @param {string} slotName
 * @return {object}
 */
export function getPrebidBestPrice(slotName) {
	const bestPrices = {};

	if (window.pbjs && window.pbjs.getBidResponsesForAdUnitCode) {
		const slotBids = window.pbjs.getBidResponsesForAdUnitCode(slotName).bids || [];

		getAdapters().forEach((adapter) => {
			bestPrices[adapter.bidderName] = '';
		});

		slotBids.forEach((bid) => {
			if (isValidPrice(bid) && bid.status !== 'rendered') {
				const { bidderCode, cpm } = bid;
				const cmpPrice = Math.max(bestPrices[bidderCode] || 0, roundCpm(cpm, DEFAULT_MAX_CPM));

				if (cmpPrice > 0) {
					bestPrices[bidderCode] = cmpPrice.toFixed(2);
				}
			}
		});
	}

	return bestPrices;
}

export function transformPriceFromBid(bid) {
	let maxCpm = DEFAULT_MAX_CPM;

	if (videoBiddersCap50.includes(bid.bidderCode)) {
		maxCpm = 50;
	}

	return transformPriceFromCpm(bid.cpm, maxCpm);
}
