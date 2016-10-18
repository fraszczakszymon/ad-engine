import StringBuilder from '../../src/utils/string-builder';
import Context from '../../src/services/context-service';

QUnit.module('StringBuilder test', {
	beforeEach: () => {
		Context.extend({
			foo: 'bar',
			other: {
				bar: 'value'
			}
		});
	}
});

QUnit.test('regular string', (assert) => {
	assert.expect(1);

	assert.equal(
		StringBuilder.build('regular string'),
		'regular string'
	);
});

QUnit.test('string with not existing value in context', (assert) => {
	assert.expect(1);

	assert.equal(
		StringBuilder.build('does it work? {not-existing}'),
		'does it work? {not-existing}'
	);
});

QUnit.test('string with simple value from context', (assert) => {
	assert.expect(1);

	assert.equal(
		StringBuilder.build('does it work? {foo}'),
		'does it work? bar'
	);
});

QUnit.test('string with multiple values from context', (assert) => {
	assert.expect(1);

	assert.equal(
		StringBuilder.build('{foo}/{foo}'),
		'bar/bar'
	);
});

QUnit.test('string with different values from context', (assert) => {
	assert.expect(1);

	assert.equal(
		StringBuilder.build('{foo}/{other.bar}'),
		'bar/value'
	);
});

QUnit.test('string without additional values', (assert) => {
	assert.expect(1);

	assert.equal(
		StringBuilder.build('{foo}/{additionalValue}'),
		'bar/{additionalValue}'
	);
});

QUnit.test('string with additional values', (assert) => {
	assert.expect(1);

	assert.equal(
		StringBuilder.build('{foo}/{additionalValue}', { additionalValue: 'amazing' }),
		'bar/amazing'
	);
});
