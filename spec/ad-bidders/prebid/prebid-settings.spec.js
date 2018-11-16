import { expect } from 'chai';
import { context } from '../../../src/ad-engine/services/context-service';
import { getSettings } from '../../../src/ad-bidders/prebid/prebid-settings';

describe('getSettings', () => {
	it('should return videoCacheKey', () => {
		const bidResponse = { bidderCode: 'rubicon', videoCacheKey: 'b' };
		context.set('custom.rubiconDfp', true);
		const settings = getSettings();
		const hbUuid = settings.standard.adserverTargeting.find(x => x.key === 'hb_uuid');
		const result = hbUuid.val(bidResponse);
		expect(result).to.equal('b');
	});

	it('should return videoCacheKey', () => {
		const bidResponse = { bidderCode: '', videoCacheKey: 'b' };
		context.set('custom.rubiconDfp', true);
		const settings = getSettings();
		const hbUuid = settings.standard.adserverTargeting.find(x => x.key === 'hb_uuid');
		const result = hbUuid.val(bidResponse);
		expect(result).to.equal('disabled');
	});
});
