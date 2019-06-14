import { MiddlewareService } from '@wikia/ad-engine/utils';
import { assert } from 'chai';

describe('middleware-service', () => {
	let middlewareService;

	beforeEach(() => {
		middlewareService = new MiddlewareService();
	});

	it('resolves run all added middlewares', () => {
		let resolved = false;

		middlewareService
			.add(({ number }, next) => {
				next({
					number: number + 1,
				});
			})
			.add(({ number }, next) => {
				next({
					number: number * 2,
				});
			})
			.add(({ number }, next) => {
				next({
					number: number + 3,
				});
			})
			.execute(
				{
					number: 1,
				},
				({ number }) => {
					assert.equal(number, 7, 'incorrect value at the end of chain');
					resolved = true;
				},
			);

		assert.equal(resolved, true, 'chain did not resolve');
	});

	it('breaks when middleware does not execute next()', () => {
		let resolved = false;

		middlewareService
			.add(({ number }, next) => {
				next({
					number: number + 1,
				});
			})
			.add(() => {
				// no-op
			})
			.add(({ number }, next) => {
				next({
					number: number + 3,
				});
			})
			.execute(
				{
					number: 1,
				},
				() => {
					resolved = true;
				},
			);

		assert.equal(resolved, false, 'chain resolved');
	});
});
