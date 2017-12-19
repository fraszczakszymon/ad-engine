import { expect } from 'chai';
import StringBuilder from '../../src/utils/string-builder';
import Context from '../../src/services/context-service';

describe('string-builder', () => {
	beforeEach(() => {
		Context.extend({
			foo: 'bar',
			other: {
				bar: 'value'
			}
		});
	});

	it('regular string', () => {
		expect(StringBuilder.build('regular string'))
			.to.equal('regular string');
	});

	it('string with not existing value in context', () => {
		expect(StringBuilder.build('does it work? {not-existing}'))
			.to.equal('does it work? {not-existing}');
	});

	it('string with not existing object value in context', () => {
		expect(StringBuilder.build('does it work? {notExisting.foo}'))
			.to.equal('does it work? {notExisting.foo}');
	});

	it('string with not existing object property value in context', () => {
		expect(StringBuilder.build('does it work? {existing.foo.bar.test}', { existing: {} }))
			.to.equal('does it work? {existing.foo.bar.test}');
	});

	it('string with not existing array value in context', () => {
		expect(StringBuilder.build('does it work? {notExisting.5}'))
			.to.equal('does it work? {notExisting.5}');
	});

	it('string with not defined array value in context', () => {
		expect(StringBuilder.build('does it work? {array.5}', { array: [] }))
			.to.equal('does it work? {array.5}');
	});

	it('string with simple value from context', () => {
		expect(StringBuilder.build('does it work? {foo}'))
			.to.equal('does it work? bar');
	});

	it('string with multiple values from context', () => {
		expect(StringBuilder.build('{foo}/{foo}'))
			.to.equal('bar/bar');
	});

	it('string with different values from context', () => {
		expect(StringBuilder.build('{foo}/{other.bar}'))
			.to.equal('bar/value');
	});

	it('string without additional values', () => {
		expect(StringBuilder.build('{foo}/{additionalValue}'))
			.to.equal('bar/{additionalValue}');
	});

	it('string with additional values', () => {
		expect(StringBuilder.build('{foo}/{additionalValue}', { additionalValue: 'amazing' }))
			.to.equal('bar/amazing');
	});

	it('string with additional values (array)', () => {
		expect(StringBuilder.build('{foo}/{additionalValue.0}', { additionalValue: ['amazing', 'array'] }))
			.to.equal('bar/amazing');
	});

	it('string with additional values (object)', () => {
		expect(StringBuilder.build('{foo}/{additionalValue.foo.bar}', { additionalValue: { foo: { bar: 'objectValue' } } }))
			.to.equal('bar/objectValue');
	});

	it('string with additional values (object and array)', () => {
		expect(StringBuilder.build('{foo}/{additionalValue.foo.0}', { additionalValue: { foo: ['amazing', 'array'] } }))
			.to.equal('bar/amazing');
	});
});
