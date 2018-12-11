import sinon from 'sinon';
import { assert } from 'chai';
import { PrebidiumProvider } from '../../../src/ad-engine/providers/prebidium-provider';

describe('PrebidiumProvider', () => {
	let sandbox;
	let quePush;
	let renderAd;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		window.pbjs = {
			renderAd: () => {},
			que: [],
		};
		renderAd = sandbox.stub(window.pbjs, 'renderAd');
		quePush = sandbox.stub(window.pbjs.que, 'push').callsFake((method) => method());
	});

	it('should call renderAd', () => {
		const prebidiumProvider = new PrebidiumProvider();

		prebidiumProvider.fillIn();
		assert(quePush.called);
		assert(renderAd.called);
	});

	afterEach(() => {
		sandbox.restore();
	});
});
