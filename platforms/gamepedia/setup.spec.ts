import { AdEngine } from '@wikia/ad-engine';
import { expect } from 'chai';
import { adsSetup } from './setup';

describe('AdsSetup', () => {
	it('init', () => {
		expect(adsSetup.init() instanceof AdEngine).to.equal(true);
	});
});
