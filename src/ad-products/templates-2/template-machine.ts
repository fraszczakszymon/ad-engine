import { Dictionary } from '@ad-engine/core';
import { logger } from '../../ad-engine/utils/logger';
import { TemplateStateHandler } from './template-state-handler';

type Collection<T, U> = { [K in keyof T]: U };

export abstract class TemplateMachine<T extends Dictionary<TemplateState<TemplateMachine<T>>>> {
	states: T;
	protected currentStateName: keyof T;

	private get currentState(): TemplateState<TemplateMachine<T>> {
		const currentState = this.states[this.currentStateName];

		if (!currentState) {
			throw new Error(`State (${this.currentStateName}) does not exist.`);
		}

		return this.states[this.currentStateName];
	}

	async transition(targetStateName: keyof T): Promise<void> {
		await this.currentState.leave();
		this.currentStateName = targetStateName;
		await this.currentState.enter();
	}
}

export abstract class TemplateState<T extends TemplateMachine<any>> {
	protected abstract name: string;
	protected abstract handlers: TemplateStateHandler[] = [];
	protected transitions: keyof T['states'];

	protected constructor(private machine: T) {}

	async enter(): Promise<void> {
		const transition = (targetStateName: keyof T['states']) =>
			this.machine.transition(targetStateName);

		logger(`State - ${name}`, 'enter');
		await Promise.all(this.handlers.map(async (handler) => handler.onEnter(transition)));
		logger(`State - ${name}`, 'entered');
	}

	async leave(): Promise<void> {
		logger(`State - ${name}`, 'leave');
		await Promise.all(this.handlers.map(async (handler) => handler.onLeave()));
		logger(`State - ${name}`, 'left');
	}
}
//
// const a = {
// 	a: 'aa',
// 	b: 'bb',
// }
//
// type A = {[key in keyof typeof a]: number}
