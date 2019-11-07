import { gptFactory } from '@wikia/ad-engine/providers/gpt-factory';
import { SinonSandbox, SinonStub } from 'sinon';

export type GptStub = { [key in keyof googletag.Googletag]: SinonStub & googletag.Googletag[key] };

function createGptStub(sandbox: SinonSandbox): GptStub {
	return {
		apiReady: sandbox.stub() as any,
		cmd: sandbox.stub() as any,
		pubadsReady: sandbox.stub() as any,
		// ### Methods ###
		companionAds: sandbox.stub(),
		content: sandbox.stub(),
		defineOutOfPageSlot: sandbox.stub().returns({}),
		defineSlot: sandbox.stub().returns({}),
		destroySlots: sandbox.stub(),
		disablePublisherConsole: sandbox.stub(),
		display: sandbox.stub(),
		enableServices: sandbox.stub(),
		getVersion: sandbox.stub(),
		openConsole: sandbox.stub(),
		pubads: sandbox.stub().returns({}),
		setAdIframeTitle: sandbox.stub(),
		sizeMapping: sandbox.stub().returns({}),
	};
}

export function stubGpt(sandbox: SinonSandbox): { gptInitStub: SinonStub; gptStub: GptStub } {
	const gptStub: GptStub = createGptStub(sandbox);
	const gptInitStub = sandbox.stub(gptFactory, 'init').returns(Promise.resolve(gptStub));

	return {
		gptInitStub,
		gptStub,
	};
}
