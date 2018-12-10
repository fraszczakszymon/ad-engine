import { context } from './context-service';
import { queryString } from '../utils/query-string';

const isOptInByQueryParam = queryString.get('tracking-opt-in-status') === 'true';

function isOptedIn() {
	return isOptInByQueryParam || context.get('options.trackingOptIn');
}

export const trackingOptIn = {
	isOptedIn,
};
