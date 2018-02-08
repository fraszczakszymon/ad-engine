import { expect } from 'chai';
import { spy, createSandbox } from 'sinon';
import adSlotFake from '../ad-slot-fake';
import { btfBlockerService } from '../../src/services/btf-blocker-service';
import {context} from "../../src/services/context-service";

let atfSlot;
let btfSlot;
let onRenderEndedCallback;
let sandbox;

describe('btf-blocker-service', () => {

	beforeEach(() => {

	});

	beforeEach(() => {
		sandbox = createSandbox();
		sandbox.stub(context, 'push').callsFake((key, callbacks) => {
			onRenderEndedCallback = callbacks.onRenderEnded;
		});
		window.ads = {
			runtime: {}
		};

		btfBlockerService.init();

		atfSlot = Object.assign({}, adSlotFake);
		atfSlot.isAboveTheFold = () => { return true; };
		btfSlot = Object.assign({}, adSlotFake);
		btfSlot.isAboveTheFold = () => { return false; };
		btfSlot.isEnabled = () => {};
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should fill in ATF slot', () => {
		const fillInSpy = spy();

		btfBlockerService.push(atfSlot, fillInSpy);

		expect(fillInSpy.called).to.be.ok;
	});

	it('should not fill in BTF slot without ATF', () => {
		const fillInSpy = spy();

		btfBlockerService.push(btfSlot, fillInSpy);

		expect(fillInSpy.called).to.not.be.ok;
	});

	it('should not fill in BTF slot until ATF rendered', () => {
		const atfFillInSpy = spy();
		const btfFillInSpy = spy();

		btfBlockerService.push(atfSlot, atfFillInSpy);
		btfBlockerService.push(btfSlot, btfFillInSpy);

		expect(atfFillInSpy.called).to.be.ok;
		expect(btfFillInSpy.called).to.not.be.ok;
	});

	it('should fill in BTF slot after ATF rendered', () => {
		const atfFillInSpy = spy();
		const btfFillInSpy = spy();

		btfBlockerService.push(atfSlot, atfFillInSpy);
		btfBlockerService.push(btfSlot, btfFillInSpy);

		expect(atfFillInSpy.called).to.be.ok;
		expect(btfFillInSpy.called).to.not.be.ok;

		onRenderEndedCallback(atfSlot);
		expect(btfFillInSpy.called).to.be.ok;
	});
});
