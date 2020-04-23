import { Container } from '@wikia/dependency-injection';
import { Type } from '../models/dictionary';
import { PipelineAdapter, PipelineNext } from './pipeline-types';

export interface PipelineDependency<TPayload> {
	execute(payload: TPayload, next?: PipelineNext<TPayload>): Promise<TPayload>;
}

export class PipelineContainerAdapter<TPayload>
	implements PipelineAdapter<Type<PipelineDependency<TPayload>>, TPayload> {
	constructor(private container: Container) {}

	execute(
		step: Type<PipelineDependency<TPayload>>,
		payload: TPayload,
		next?: PipelineNext<TPayload>,
	): Promise<TPayload> {
		const instance = this.container.get(step);

		return instance.execute(payload, next);
	}
}
