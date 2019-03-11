import { expect } from 'chai';
import { getTargeting } from '../../../src/ad-bidders/prebid/prebid-helper';
import { context } from '../../../src/ad-engine/services/context-service';

describe('prebid helper', () => {
	it('should return page level targeting with pos=slotName', () => {
		context.set('bidders.prebid.targeting', {
			foo: 1,
			bar: 'test',
		});

		expect(getTargeting('slot_name')).to.deep.equal({
			foo: 1,
			bar: 'test',
			pos: ['slot_name'],
		});
	});
});
