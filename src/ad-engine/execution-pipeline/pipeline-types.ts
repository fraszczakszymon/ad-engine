export type PipelineNext<TPayload> = (payload: TPayload) => Promise<TPayload>;

export type PipelineStepAdapter<TStep, TPayload> = (
	step: TStep,
	payload: TPayload,
	next?: PipelineNext<TPayload>,
) => Promise<TPayload>;
