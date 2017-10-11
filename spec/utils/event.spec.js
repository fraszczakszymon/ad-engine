import sinon from 'sinon';
import { once } from '../../src/utils/event';

const getMockObject = () => {
	let eventCallback;

	return {
		addEventListener: (name, callback) => {
			eventCallback = callback;
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

QUnit.test('once calls event subscribe method', (assert) => {
	assert.expect(1);

	sinon.spy(object, 'addEventListener');

	once(object, 'xxx');
	object.runCallback();
	assert.ok(object.addEventListener.calledWith('xxx'));
});
