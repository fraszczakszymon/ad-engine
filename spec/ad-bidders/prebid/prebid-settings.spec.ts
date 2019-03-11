import { expect } from 'chai';
import { getSettings } from '../../../src/ad-bidders/prebid/prebid-settings';
import { context } from '../../../src/ad-engine/services/context-service';

describe('bidder uuid', () => {
	let bidResponse;
	let getBidderUuid;

	before(() => {
		bidResponse = { bidderCode: 'rubicon', mediaType: 'video', videoCacheKey: 'b' };
		const settings = getSettings();
		const hbUuid = settings.standard.adserverTargeting.find((x) => x.key === 'hb_uuid');

		getBidderUuid = hbUuid.val;
	});

	it('should return videoCacheKey', () => {
		context.set('custom.rubiconDfp', true);
		const result = getBidderUuid(bidResponse);

		expect(result).to.equal('b');
	});
});
