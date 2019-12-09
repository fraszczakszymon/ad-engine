import { Dictionary } from '@ad-engine/core';
import { logger } from '../../ad-engine/utils/logger';

type TemplateMachineInput<T> = { [key in typeof T]: T[key] };

type Transition<T> = (targetStateKey: keyof T) => Promise<void>;

export class TemplateMachine<T extends Dictionary<TState>, TState = TemplateState<keyof T>> {
	private states: Map<keyof T, TState> = new Map();
	private currentStateKey: keyof T;

	private get currentState(): TState {
		const currentState = this.states.get(this.currentStateKey);

		if (!currentState) {
			throw new Error(`State (${this.currentStateKey}) does not exist.`);
		}

		return currentState;
	}

	constructor(input: T, initialStateKey: keyof T) {
		Object.keys(input)
			.map((key: keyof T) => ({ key, value: input[key] }))
			.forEach(({ key, value }) => {
				value.init(this);
				this.states.set(key, value);
			});

		this.currentStateKey = initialStateKey;
	}

	async transition(targetStateKey: keyof T): Promise<void> {
		await this.currentState.leave();
		this.currentStateKey = targetStateKey;
		await this.currentState.enter();
	}
}

export class TemplateState<T extends string = any> {
	private machine: TemplateMachine<T>;

	constructor(private name: string, private handlers: TemplateStateHandler<T>[] = []) {}

	init(machine: TemplateMachine<T>): void {
		this.machine = machine;
	}

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
				throw new Error(
					'Attempting to call transition second time. ' +
						'You may need to create better "onLeave" method to clean up any listeners.',
				);
			}

			called = true;

			return this.machine.transition(targetStateKey);
		};
	}
}

export interface TemplateStateHandler<T extends string> {
	onEnter(transition: Transition<T>): Promise<void>;
	onLeave(): Promise<void>;
}

const correctHandler: TemplateStateHandler<'first' | 'second'> = {} as any;
const wrongHandler: TemplateStateHandler<'first - no' | 'second'> = {} as any;

const state = new TemplateState('first', [correctHandler]);

const a = new TemplateMachine(
	{
		first: new TemplateState('first'),
		second: new TemplateState('second'),
	},
	'first',
);

a.transition('second');
