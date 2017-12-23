import { expect } from 'chai';
import sinon from 'sinon';
import { context } from '../../src/services/context-service';

function baz() {}

describe('context-service', () => {
	beforeEach(() => {
		context.extend({
			foo: {
				foo: 1,
				bar: 15,
				baz
			},
			array: []
		});
	});

	it('get leaf from key chain', () => {
		expect(context.get('foo.bar')).to.equal(15);
	});

	it('get another leaf from key chain', () => {
		expect(context.get('foo.foo')).to.equal(1);
	});

	it('get leaf - function from key chain', () => {
		const value = context.get('foo.baz');

		expect(typeof (value)).to.equal('function');
	});

	it('get not existing leaf from key chain', () => {
		expect(context.get('foo.foo.foo')).to.equal(undefined);
	});

	it('get parent object', () => {
		expect(context.get('foo')).to.deep.equal({ foo: 1, bar: 15, baz });
	});

	it('set leaf value', () => {
		context.set('foo.leaf', 'newValue');

		expect(context.get('foo.leaf')).to.equal('newValue');
	});

	it('override parent', () => {
		context.set('foo', 'newValue');

		expect(context.get('foo')).to.equal('newValue');
	});

	it('execute onChange leaf and parent callbacks', () => {
		const callbacks = {
			foo: () => {},
			fooBar: () => {}
		};

		sinon.spy(callbacks, 'foo');
		sinon.spy(callbacks, 'fooBar');

		context.onChange('foo', callbacks.foo);
		context.onChange('foo.bar', callbacks.fooBar);

		context.set('foo.bar', 'newValue');

		expect(callbacks.foo.calledWith('foo.bar', 'newValue')).to.be.ok;
		expect(callbacks.fooBar.calledWith('foo.bar', 'newValue')).to.be.ok;
	});

	it('able to push into context array', () => {
		context.push('array', 'newValue');

		expect(context.get('array').length).to.equal(1);
		expect(context.get('array')[0]).to.equal('newValue');
	});
});
