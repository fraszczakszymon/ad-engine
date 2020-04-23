import { PipelineAdapter, PipelineNext } from './pipeline-types';

export class Pipeline<TStep, TPayload = void> {
	private steps: TStep[] = [];

	constructor(private adapter: PipelineAdapter<TStep, TPayload>) {}

	add(...steps: TStep[]): this {
		this.steps.push(...steps);

		return this;
	}

	execute(payload: TPayload): Promise<TPayload> {
		const executor = this.createExecutor();

		return executor(payload);
	}

	private createExecutor(): PipelineNext<TPayload> {
		return this.steps.reduceRight<PipelineNext<TPayload>>(
			(next: PipelineNext<TPayload>, step: TStep) => (payload: TPayload) =>
				this.adapter.adapt(step, payload, next),
			async (payload: TPayload) => payload,
		);
	}
}
