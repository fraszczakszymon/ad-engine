import { Dictionary } from '@ad-engine/core';
import { TemplateState } from './template-state';
import { TemplateStateHandler } from './template-state-handler';
import { Transition } from './template-state-transition';

export class TemplateMachine<T extends Dictionary<TemplateStateHandler<string>[]>> {
	private get currentState(): TemplateState<keyof T> {
		if (!this.states.has(this.currentStateKey)) {
			throw new Error(`State (${this.currentStateKey}) does not exist.`);
		}

		return this.states.get(this.currentStateKey);
	}
	private states: Map<keyof T, TemplateState<keyof T>> = new Map();
	private currentStateKey: keyof T;

	constructor(input: T, initialStateKey: keyof T) {
		this.currentStateKey = initialStateKey;
		this.states = new Map(
			Object.keys(input).map((key: keyof T) => [
				key,
				new TemplateState(key, this.transition, input[key]),
			]),
		);
	}

	private transition: Transition<keyof T> = async (targetStateKey) => {
		await this.currentState.leave();
		this.currentStateKey = targetStateKey;
		await this.currentState.enter();
	};
}

const a = new TemplateMachine({ first: [], second: [] }, 'first');
