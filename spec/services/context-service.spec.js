import sinon from 'sinon';
import Context from '../../src/services/context-service';

function baz() {};

QUnit.module('Context service test', {
	beforeEach: () => {
		Context.extend({
			foo: {
				foo: 1,
				bar: 15,
				baz
			}
		});
	}
});

QUnit.test('get leaf from key chain', (assert) => {
	assert.expect(1);

	assert.equal(Context.get('foo.bar'), 15);
});

QUnit.test('get another leaf from key chain', (assert) => {
	assert.expect(1);

	assert.equal(Context.get('foo.foo'), 1);
});

QUnit.test('get leaf - function from key chain', (assert) => {
	assert.expect(1);

	const value = Context.get('foo.baz');

	assert.equal(typeof (value), 'function');
});

QUnit.test('get not existing leaf from key chain', (assert) => {
	assert.expect(1);

	assert.equal(Context.get('foo.foo.foo'), undefined);
});

QUnit.test('get parent object', (assert) => {
	assert.expect(1);

	assert.deepEqual(Context.get('foo'), { foo: 1, bar: 15, baz} );
});

QUnit.test('set leaf value', (assert) => {
	assert.expect(1);

	Context.set('foo.leaf', 'newValue');

	assert.equal(Context.get('foo.leaf'), 'newValue');
});

QUnit.test('override parent', (assert) => {
	assert.expect(1);

	Context.set('foo', 'newValue');

	assert.equal(Context.get('foo'), 'newValue');
});

QUnit.test('execute onChange leaf and parent callbacks', (assert) => {
	const callbacks = {
		foo: () => {},
		fooBar: () => {}
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
