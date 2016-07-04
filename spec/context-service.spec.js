'use strict';

import sinon from 'sinon';
import Context from '../src/services/context-service';

QUnit.module('Context service test', {
	beforeEach: () => {
		Context.extend({
			foo: {
				foo: 1,
				bar: 15
			}
		});
	}
});

QUnit.test('get leaf from key chain', function (assert) {
	assert.expect(1);

	assert.equal(Context.get('foo.bar'), 15);
});

QUnit.test('get another leaf from key chain', function (assert) {
	assert.expect(1);

	assert.equal(Context.get('foo.foo'), 1);
});

QUnit.test('get not existing leaf from key chain', function (assert) {
	assert.expect(1);

	assert.equal(Context.get('foo.foo.foo'), undefined);
});

QUnit.test('get parent object', function (assert) {
	assert.expect(1);

	assert.deepEqual(Context.get('foo'), {foo: 1, bar: 15});
});

QUnit.test('set leaf value', function (assert) {
	assert.expect(1);

	Context.set('foo.leaf', 'newValue');

	assert.equal(Context.get('foo.leaf'), 'newValue');
});

QUnit.test('override parent', function (assert) {
	assert.expect(1);

	Context.set('foo', 'newValue');

	assert.equal(Context.get('foo'), 'newValue');
});

QUnit.test('execute onChange leaf and parent callbacks', function (assert) {
	const callbacks = {
			foo: function () {},
			fooBar: function () {}
		};

	assert.expect(2);

	sinon.spy(callbacks, 'foo');
	sinon.spy(callbacks, 'fooBar');

	Context.onChange('foo', callbacks.foo);
	Context.onChange('foo.bar', callbacks.fooBar);

	Context.set('foo.bar', 'newValue');

	assert.ok(callbacks.foo.calledWith('foo.bar', 'newValue'));
	assert.ok(callbacks.fooBar.calledWith('foo.bar', 'newValue'));
});
