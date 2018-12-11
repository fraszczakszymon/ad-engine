import sinon from 'sinon';
import { assert } from 'chai';

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
		quePush = sandbox.stub(window.pbjs.que, 'push').callsFake((method) => method);
		renderAd = sandbox.stub(window.pbjs, 'renderAd');
	});

	it('should call renderAd', () => {
		assert(true);
	});

	afterEach(() => {
		sandbox.restore();
	});
});
