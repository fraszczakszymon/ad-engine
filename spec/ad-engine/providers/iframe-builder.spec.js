import sinon from 'sinon';
import { assert } from 'chai';
import { IframeBuilder } from '@wikia/ad-engine';

describe('IFrameBuilder', () => {
	let sandbox;
	let iframeBuilder;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		iframeBuilder = new IframeBuilder();
	});

	describe('create', () => {
		it('should run', () => {
			const div = document.createElement('div');
			const adSlot = {
				getElement: () => div,
			};
			const iframe = iframeBuilder.create(adSlot);

			assert.equal(iframe.tagName, 'IFRAME');
			assert.equal(iframe.frameBorder, 0);
			assert.equal(div.children[0], iframe);
			assert.equal(iframe.contentDocument.body.style.margin, 0);
		});
	});

	afterEach(() => {
		sandbox.restore();
	});
});
