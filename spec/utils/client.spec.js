import { expect } from 'chai';
import { client } from '../../src/utils/client';

describe('client', () => {
	it('check adblock detection system', () => {
		let adsBlocked = false,
			notBlocked = false;

		client.checkBlocking(() => { adsBlocked = true; }, () => { notBlocked = true; });

		// Failed to load plugin because lack of window = simulate AdBlock disabling import
		expect(adsBlocked).to.equal(true);
		expect(notBlocked).to.equal(false);
	});
});
