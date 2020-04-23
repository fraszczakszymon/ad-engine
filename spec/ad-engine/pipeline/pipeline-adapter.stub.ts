import { PipelineAdapter, PipelineNext } from '@wikia/ad-engine/pipeline/pipeline-types';

// TODO: Consider making it actual adapter. It could replace middleware adapter in the future.
export type PipelineStepStub<TPayload> = (
	payload: TPayload,
	next?: PipelineNext<TPayload>,
) => Promise<TPayload>;

export class PipelineAdapterStub<TPayload>
	implements PipelineAdapter<PipelineStepStub<TPayload>, TPayload> {
	async execute(
		step: PipelineStepStub<TPayload>,
		payload: TPayload,
		next?: PipelineNext<TPayload>,
	): Promise<TPayload> {
		return step(payload, next as any);
	}
}
