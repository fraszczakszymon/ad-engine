import { context } from './context-service';
import { queryString } from '../utils/query-string';

const isOptOutByQueryParam = !!parseInt(queryString.get('trackingoptout') || '', 10);

function isOptOutEnabled() {
	return isOptOutByQueryParam || context.get('options.trackingOptOut');
}

function isBlacklisted(featureName) {
	const blacklist = context.get('options.trackingOptOutBlacklist') || {};

	return blacklist[featureName];
}

function isOptedOut(tracking) {
	return isOptOutEnabled() && isBlacklisted(tracking);
}

export const trackingOptOut = {
	isOptedOut
};
