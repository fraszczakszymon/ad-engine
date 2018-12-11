import sinon from 'sinon';
import { assert } from 'chai';
import { context, PrebidiumProvider, slotService } from '@wikia/ad-engine';

describe('PrebidiumProvider', () => {
	let sandbox;
	let prebidiumProvider;
	let quePush;
	let renderAd;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		prebidiumProvider = new PrebidiumProvider();
		sandbox.stub(prebidiumProvider.iframeBuilder, 'create').returns({
			contentWindow: {
				document: {},
			},
		});

		sandbox.stub(slotService, 'add');
		sandbox.stub(context, 'get').returns('test_ad_id');

		window.pbjs = {
			renderAd: () => {},
			que: [],
		};
		renderAd = sandbox.stub(window.pbjs, 'renderAd');
		quePush = sandbox.stub(window.pbjs.que, 'push').callsFake((method) => method());
	});

	it('should call renderAd', () => {
		const adSlot = {
			getSlotName: () => 'test_slot_name',
		};

		prebidiumProvider.fillIn(adSlot);
		assert(quePush.called, `Function did not wait for pbjs to load`);
		assert(renderAd.called, 'Function did not call render add');
	});

	afterEach(() => {
		sandbox.restore();
	});
});
