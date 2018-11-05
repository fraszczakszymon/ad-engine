import { expect, assert } from 'chai';
import sinon from 'sinon';
import { WikiaVideo } from '../../../../src/ad-bidders/prebid/adapters/wikia-video';

function getMocks() {
	const mocks = {
		addBidResponseMock: sinon.spy(),
		bidsRequestMock: {
			bidderCode: 'fake-wikia-video-bidder',
			auctionId: 'fake-id',
			bids: [{
				adUnitCode: 'fake-ad-unit',
				sizes: [[640, 480]]
			}]
		},
		fakeVastUrl: 'https://fake-vast-url',
		fakePrice: 20,
		done: function () {},
		setTimeout: function (cb) {
			cb();
		},
		window: {
			pbjs: {
				createBid: function () {
					return {};
				}
			}
		}
	};

	return mocks;
}

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

	it('calls addBiddResponse callback with correct properties', () => {
		const wikiaVideo = new WikiaVideo({
			enabled: true,
			slots: {
				featured: {}
			}
		});
		const mocks = getMocks();

		global.window.pbjs = mocks.window.pbjs;
		global.setTimeout = mocks.setTimeout;
		sinon.stub(wikiaVideo, 'getVastUrl').returns(mocks.fakeVastUrl);
		sinon.stub(wikiaVideo, 'getPrice').returns(mocks.fakePrice);

		wikiaVideo.addBids(mocks.bidsRequestMock, mocks.addBidResponseMock, mocks.done);
		assert.ok(mocks.addBidResponseMock.called);
		expect(mocks.addBidResponseMock.args[0]).to.deep.equal([
			'fake-ad-unit',
			{
				bidderCode: 'fake-wikia-video-bidder',
				cpm: 20,
				creativeId: 'foo123_wikiaVideoCreativeId',
				ttl: 300,
				mediaType: 'video',
				width: 640,
				height: 480,
				vastUrl: 'https://fake-vast-url',
				videoCacheKey: '123foo_wikiaVideoCacheKey',
			}
		]);
	});
});
