import sinon from 'sinon';
import { assert } from 'chai';
import { context, PrebidiumProvider, slotService } from '@wikia/ad-engine';

describe('PrebidiumProvider', () => {
	let sandbox;
	let prebidiumProvider;
	const stub = {
		// utils: {
		// 	logger: undefined,
		// },
		slotService: {
			add: undefined,
		},
		context: {
			get: undefined,
		},
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
		stub.slotService.add = sandbox.stub(slotService, 'add');
		stub.context.get = sandbox.stub(context, 'get').returns(mock.adId);
		// stub.utils.logger = sandbox.stub(utils, 'logger');
		stubPbjs();
	});

	describe('fillIn', () => {
		let adSlot;

		beforeEach(() => {
			adSlot = {
				getSlotName: () => mock.slotName,
			};
			prebidiumProvider.fillIn(adSlot);
		});

		it('should call renderAd', () => {
			const [doc, adId] = stub.renderAd.getCall(0).args;

			assert(stub.renderAd.calledOnce);
			assert.equal(doc, mock.doc);
			assert.equal(adId, mock.adId);
		});

		it('should be postponed until pbjs loads', () => {
			assert(stub.que.push.calledOnce);
		});

		it('should call slotService add with correct argument', () => {
			const argument = stub.slotService.add.getCall(0).args[0];

			assert(stub.slotService.add.calledOnce);
			assert.equal(argument, adSlot);
		});

		it('should call context get with correct argument', () => {
			const argument = stub.context.get.getCall(0).args[0];

			assert(stub.context.get.calledOnce);
			assert.equal(argument, `slots.${mock.slotName}.targeting.hb_adid`);
		});

		// it('should call logger', () => {
		// 	const [logGroup, slotName, message] = stub.utils.logger.getCall(0).args;
		//
		// 	assert(stub.utils.logger.calledOnce);
		// 	assert.equal(logGroup, 'prebidium-provider');
		// 	assert.equal(slotName, mock.slotName);
		// 	assert.equal(message, 'slot added');
		// });
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
});
