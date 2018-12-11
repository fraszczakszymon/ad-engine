import sinon from 'sinon';
import { assert } from 'chai';
import { context, PrebidiumProvider, slotService } from '@wikia/ad-engine';

describe('PrebidiumProvider', () => {
	let sandbox;
	let prebidiumProvider;
	const stub = {
		que: {
			push: undefined,
		},
		renderAd: undefined,
	};
	const mock = {
		doc: 'mock_document',
		adId: 'mock_ad_id',
		slotName: 'mock_slot_name',
	};

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		prebidiumProvider = new PrebidiumProvider();

		stubIframeBuilder();
		sandbox.stub(slotService, 'add');
		sandbox.stub(context, 'get').returns(mock.adId);
		stubPbjs();
	});

	describe('fillIn', () => {
		it('should call renderAd', () => {
			prebidiumProvider.fillIn(getAdSlot());
			const [doc, adId] = stub.renderAd.getCall(0).args;

			assert(stub.renderAd.called);
			assert.equal(doc, mock.doc);
			assert.equal(adId, mock.adId);
		});

		it('should be postponed until pbjs loads', () => {
			prebidiumProvider.fillIn(getAdSlot());
			assert(stub.que.push.called, `Function did not wait for pbjs to load`);
		});
	});

	afterEach(() => {
		sandbox.restore();
	});

	function stubIframeBuilder() {
		sandbox.stub(prebidiumProvider.iframeBuilder, 'create').returns({
			contentWindow: {
				document: mock.doc,
			},
		});
	}

	function stubPbjs() {
		window.pbjs = {
			renderAd: () => {},
			que: [],
		};
		stub.renderAd = sandbox.stub(window.pbjs, 'renderAd');
		stub.que.push = sandbox.stub(window.pbjs.que, 'push').callsFake((method) => method());
	}

	function getAdSlot() {
		return {
			getSlotName: () => mock.slotName,
		};
	}
});
