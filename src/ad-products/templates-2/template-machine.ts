import { Type } from '@ad-engine/core';
import { logger } from '../../ad-engine/utils/logger';

export class TemplateMachine<T extends TemplateState<T>> {
	protected states: Map<Type<T>, T>;
	protected currentStateKey: Type<T>;

	private get currentState(): T {
		const currentState = this.states.get(this.currentStateKey);

		if (!currentState) {
			throw new Error(`State (${this.currentStateKey}) does not exist.`);
		}

		return currentState;
	}

	constructor(input: Type<T>[]) {
		this.states = new Map(input.map((Key) => [Key, new Key(this)]));
	}

	async transition(targetStateKey: Type<T>): Promise<void> {
		await this.currentState.leave();
		this.currentStateKey = targetStateKey;
		await this.currentState.enter();
	}
}

type Transition<T> = (targetStateKey: Type<T>) => Promise<void>;

export abstract class TemplateState<T extends TemplateState<any>> {
	protected abstract name: string;
	protected abstract handlers: TemplateStateHandler<T>[] = [];

	constructor(private machine: TemplateMachine<any>) {}

	async enter(): Promise<void> {
		logger(`State - ${name}`, 'enter');
		await Promise.all(this.handlers.map(async (handler) => handler.onEnter(this.useTransition())));
		logger(`State - ${name}`, 'entered');
	}

	async leave(): Promise<void> {
		logger(`State - ${name}`, 'leave');
		await Promise.all(this.handlers.map(async (handler) => handler.onLeave()));
		logger(`State - ${name}`, 'left');
	}

	private useTransition(): Transition<T> {
		let called = false;

		return (targetStateKey) => {
			if (called) {
				throw new Error('Attempting to call transition second time.');
			}

			called = true;

			return this.machine.transition(targetStateKey);
		};
	}
}

export interface TemplateStateHandler<TTransitions extends TemplateState<any>> {
	onEnter(transition: Transition<TTransitions>): Promise<void>;
	onLeave(): Promise<void>;
}
