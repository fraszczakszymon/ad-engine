import { SinonSandbox, SinonStub } from 'sinon';

export interface TemplateStateHandlerSpy {
	constructor: SinonStub;
	onEnter: SinonStub;
	onLeave: SinonStub;
	onDestroy: SinonStub;
}

export function createTemplateStateHandlerSpy(sandbox: SinonSandbox): TemplateStateHandlerSpy {
	return {
		constructor: sandbox.stub().resolves(),
		onEnter: sandbox.stub().resolves(),
		onLeave: sandbox.stub().resolves(),
		onDestroy: sandbox.stub().resolves(),
	};
}
