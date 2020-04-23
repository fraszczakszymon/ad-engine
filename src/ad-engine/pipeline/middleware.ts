import { Pipeline } from './pipeline';
import { PipelineMiddlewareAdapter } from './pipeline-middleware-adapter';

type MiddlewareNext<T> = (context: T) => Promise<void>;

export type Middleware<T> = (context: T, next?: MiddlewareNext<T>) => void | Promise<void>;

export class MiddlewareService<T> {
	private pipeline = new Pipeline(new PipelineMiddlewareAdapter<T>());

	add(middleware: Middleware<T>): this {
		this.pipeline.add(middleware);

		return this;
	}

	execute(context: any, final: Middleware<T>): void {
		this.pipeline.add(final);
		this.pipeline.execute(context);
	}
}
