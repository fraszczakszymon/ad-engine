import { MiddlewareChain } from '@wikia/ad-engine/utils';
import { assert } from 'chai';

describe('middleware-chain', () => {
	let chain;

	beforeEach(() => {
		chain = new MiddlewareChain();
	});

	it('has proper interface', () => {
		assert.equal(typeof chain.addMiddleware, 'function');
		assert.equal(typeof chain.resolve, 'function');
	});

	it('resolves run all added middlewares', () => {
		let resolved = false;

		chain
			.addMiddleware((next) => (number) => {
				next(number + 1);
			})
			.addMiddleware((next) => (number) => {
				next(number * 2);
			})
			.addMiddleware((next) => (number) => {
				next(number + 3);
			})
			.resolve((number) => {
				assert.equal(number, 7, 'incorrect value at the end of chain');
				resolved = true;
			}, 1);

		assert.equal(resolved, true, 'chain did not resolve');
	});

	it('breaks when middleware does not execute next()', () => {
		let resolved = false;

		chain
			.addMiddleware((next) => (number) => {
				next(number + 1);
			})
			.addMiddleware(() => () => {
				// no-op
			})
			.addMiddleware((next) => (number) => {
				next(number + 3);
			})
			.resolve(() => {
				resolved = true;
			}, 1);

		assert.equal(resolved, false, 'chain resolved');
	});
});
