import { TemplateState } from './template-state';
import { Transition } from './template-state-transition';

export class TemplateMachine<T extends string> {
	private get currentState(): TemplateState<T> {
		if (!this.states.has(this.currentStateKey)) {
			throw new Error(`State (${this.currentStateKey}) does not exist.`);
		}

		return this.states.get(this.currentStateKey);
	}
	private states: Map<T, TemplateState<T>> = new Map();
	private currentStateKey: T;

	constructor(statesNames: T[]) {
		this.currentStateKey = statesNames[0];
		this.states = new Map(
			statesNames.map((name) => [name, new TemplateState(name, this.transition, [])]),
		);
	}

	private transition: Transition<T> = async (targetStateKey) => {
		await this.currentState.leave();
		this.currentStateKey = targetStateKey;
		await this.currentState.enter();
	};
}

const a = new TemplateMachine(['first', 'second'] as const);
