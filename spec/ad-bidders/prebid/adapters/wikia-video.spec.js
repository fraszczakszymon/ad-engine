import { expect } from 'chai';
import { WikiaVideo } from '../../../../src/ad-bidders/prebid/adapters/wikia-video';

describe('WikiaVideo bidder adapter', () => {
	it('can be enabled', () => {
		const wikiaVideo = new WikiaVideo({
			enabled: true
		});

		expect(wikiaVideo.enabled).to.equal(false);
	});

	it('prepareAdUnits returns data in correct shape', () => {
		const wikiaVideo = new WikiaVideo({
			enabled: true,
			slots: {
				featured: {}
			}
		});

		expect(wikiaVideo.prepareAdUnits()).to.deep.equal([
			{
				code: 'featured',
				mediaTypes: {
					video: {
						context: 'outstream',
						playerSize: [640, 480]
					}
				},
				bids: [
					{
						bidder: 'wikiaVideo'
					}
				]
			}
		]);
	});
});
