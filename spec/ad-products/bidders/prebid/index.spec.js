import { Prebid } from '../../../../src/ad-products/bidders/prebid/index';

const bidderConfig = {
	lazyLoadingEnabled: false,
	bidsRefreshing: {
		enabled: false
	}
};

describe('Prebid bidder', () => {
	it('can be initialized', () => {
		new Prebid(bidderConfig);
	});
});
