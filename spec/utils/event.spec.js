import sinon from 'sinon';
import { once } from '../../src/utils/event';

const getMockObject = () => {
	let eventCallback;

	return {
		addEventListener: (name, callback) => {
			eventCallback = callback;
		},
		removeEventListener: () => {
			eventCallback = undefined;
		},
		runCallback: (...args) => {
			eventCallback(...args);
		}
	};
};
let object;

QUnit.module('Event util', {
	beforeEach: () => {
		object = getMockObject();
	}
});

QUnit.test('once returns a promise', (assert) => {
	assert.expect(2);

	const promise = once(object, 'xxx');

	assert.ok(typeof promise.then === 'function');
	assert.ok(typeof promise.catch === 'function');
});

QUnit.test('once calls event subscribe/unsubscribe methods', (assert) => {
	assert.expect(2);

	sinon.spy(object, 'addEventListener');
	sinon.spy(object, 'removeEventListener');

	once(object, 'xxx');
	object.runCallback();
	assert.ok(object.addEventListener.calledWith('xxx'));
	assert.ok(object.removeEventListener.calledWith('xxx'));
});
