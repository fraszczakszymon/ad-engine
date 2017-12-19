import { expect } from 'chai';
import sinon from 'sinon';
import Context from '../../src/services/context-service';

function baz() {}

describe('context-service', () => {
	beforeEach(() => {
		Context.extend({
			foo: {
				foo: 1,
				bar: 15,
				baz
			},
			array: []
		});
	});

	it('get leaf from key chain', () => {
		expect(Context.get('foo.bar')).to.equal(15);
	});

	it('get another leaf from key chain', () => {
		expect(Context.get('foo.foo')).to.equal(1);
	});

	it('get leaf - function from key chain', () => {
		const value = Context.get('foo.baz');

		expect(typeof (value)).to.equal('function');
	});

	it('get not existing leaf from key chain', () => {
		expect(Context.get('foo.foo.foo')).to.equal(undefined);
	});

	it('get parent object', () => {
		expect(Context.get('foo')).to.deep.equal({ foo: 1, bar: 15, baz });
	});

	it('set leaf value', () => {
		Context.set('foo.leaf', 'newValue');

		expect(Context.get('foo.leaf')).to.equal('newValue');
	});

	it('override parent', () => {
		Context.set('foo', 'newValue');

		expect(Context.get('foo')).to.equal('newValue');
	});

	it('execute onChange leaf and parent callbacks', () => {
		const callbacks = {
			foo: () => {},
			fooBar: () => {}
		};

		sinon.spy(callbacks, 'foo');
		sinon.spy(callbacks, 'fooBar');

		Context.onChange('foo', callbacks.foo);
		Context.onChange('foo.bar', callbacks.fooBar);

		Context.set('foo.bar', 'newValue');

		expect(callbacks.foo.calledWith('foo.bar', 'newValue')).to.be.ok;
		expect(callbacks.fooBar.calledWith('foo.bar', 'newValue')).to.be.ok;
	});

	it('able to push into context array', () => {
		Context.push('array', 'newValue');

		expect(Context.get('array').length).to.equal(1);
		expect(Context.get('array')[0]).to.equal('newValue');
	});
});
