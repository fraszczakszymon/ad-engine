import { Middleware } from './middleware';
import { PipelineAdapter, PipelineNext } from './pipeline-types';

export class PipelineMiddlewareAdapter<TPayload>
	implements PipelineAdapter<Middleware<TPayload>, TPayload> {
	async adapt(
		step: Middleware<TPayload>,
		payload: TPayload,
		next?: PipelineNext<TPayload>,
	): Promise<TPayload> {
		await step(payload, next as any);

		return payload;
	}
}
