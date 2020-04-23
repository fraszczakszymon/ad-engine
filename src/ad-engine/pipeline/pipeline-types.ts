export type PipelineNext<TPayload> = (payload: TPayload) => Promise<TPayload>;

export interface PipelineAdapter<TStep, TPayload> {
	// TODO: rename to execute
	adapt(step: TStep, payload: TPayload, next?: PipelineNext<TPayload>): Promise<TPayload>;
}
