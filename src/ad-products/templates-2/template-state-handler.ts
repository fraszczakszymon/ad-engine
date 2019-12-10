import { Transition } from './template-state-transition';

export interface TemplateStateHandler<T extends string> {
	onEnter(transition: Transition<T>): Promise<void>;

	onLeave(): Promise<void>;
}
