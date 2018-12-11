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
			const adSlot = {
				getElement: () => document.createElement('div'),
			};

			iframeBuilder.create(adSlot);
			assert(true);
		});
	});

	afterEach(() => {
		sandbox.restore();
	});
});
