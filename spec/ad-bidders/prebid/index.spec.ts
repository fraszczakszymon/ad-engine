import { expect } from 'chai';
import { Prebid } from '../../../src/ad-bidders/prebid/index';
import { context } from '../../../src/ad-engine/services/context-service';

const bidderConfig = {
	lazyLoadingEnabled: false,
	bidsRefreshing: {
		enabled: false,
	},
};

describe('Prebid bidder', () => {
	it('can be initialized', () => {
		new Prebid(bidderConfig);
	});

	it('returns all pbjs keys to reset', () => {
		const prebid = new Prebid(bidderConfig);

		context.set('slots.top_leaderboard.targeting', {
			src: 'foo',
			loc: 'top',
			hb_bidder: 'wikia',
			hb_pb: '20.0',
		});
		const keys = prebid.getTargetingKeys('top_leaderboard');

		expect(keys.length).to.equal(2);
		expect(keys).to.deep.equal(['hb_bidder', 'hb_pb']);
	});
});
