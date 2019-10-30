import { expect } from 'chai';
import { createSandbox } from 'sinon';
import { GptProvider } from '../../../src/ad-engine/providers/gpt-provider';
import { context } from '../../../src/ad-engine/services/context-service';
import { stubGpt } from '../../ad-engine/providers/gpt.stub';

let provider;

describe('gpt-provider', () => {
	const sandbox = createSandbox();
	let pubadsStub;

	after(() => {
		context.removeListeners('targeting');
	});

	beforeEach(() => {
		const { gptStub } = stubGpt(sandbox);

		pubadsStub = {
			addEventListener: sandbox.spy(),
			disableInitialLoad: sandbox.spy(),
			enableSingleRequest: sandbox.spy(),
			setRequestNonPersonalizedAds: sandbox.spy(),
			setTargeting: sandbox.spy(),
		};
		gptStub.pubads.returns(pubadsStub);
		context.set('options.trackingOptIn', true);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('initialise and setup gpt provider', (done) => {
		provider = new GptProvider();

		setTimeout(() => {
			expect(pubadsStub.disableInitialLoad.called).to.be.true;
			expect(pubadsStub.enableSingleRequest.called).to.be.false;
			expect(pubadsStub.addEventListener.calledThrice).to.be.true;
			expect(pubadsStub.setRequestNonPersonalizedAds.calledWith(0)).to.be.true;
			done();
		});
	});

	it('initialise with non personalized ads when tracking in is disabled', (done) => {
		context.set('options.trackingOptIn', false);

		provider = new GptProvider();
		provider.setupNonPersonalizedAds();
		setTimeout(() => {
			expect(pubadsStub.setRequestNonPersonalizedAds.calledWith(1)).to.be.true;
			done();
		});
	});
});
