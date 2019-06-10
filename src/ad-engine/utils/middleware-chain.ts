type MiddlewareCallback = (...args: any) => any;
type Middleware = (...args: any) => MiddlewareCallback;

export class MiddlewareChain {
	private middlewareList: Middleware[] = [];

	addMiddleware(middleware: Middleware): this {
		this.middlewareList.push(middleware);

		return this;
	}

	resolve(callback: MiddlewareCallback, ...args) {
		let current = 0;
		const middlewareList = [...this.middlewareList];

		const next = (...nextArgs) => {
			const middleware = middlewareList[current += 1];

			if (typeof middleware !== 'function') {
				return callback(...nextArgs);
			}

			return middleware(next)(...nextArgs);
		};

		return middlewareList[current](next)(...args);
	}
}
