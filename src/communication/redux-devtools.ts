import { Action } from 'ts-action';
import { ReduxDevtoolsOptions } from './redux-devtools-options';

interface ReduxDevtoolsExtension {
	connect(options?: ReduxDevtoolsOptions): ReduxDevtools;
}

/**
 * @link https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Methods.md
 */
export interface ReduxDevtools {
	subscribe(listener: (action: Action) => void): () => void;
	unsubscribe(): void;
	send<T>(action: Action, state: T): void;
	init<T>(state: T): void;
	error(message: string): void;
}

export abstract class ReduxDevtoolsFactory {
	private static devtools: ReduxDevtools;

	static connect(): ReduxDevtools | undefined {
		if (this.devtools) {
			throw new Error('Trying to initialize ReduxDevtools second time');
		}

		const extension: ReduxDevtoolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

		if (extension) {
			return (this.devtools = extension.connect({
				name: 'AdEngine',
			}));
		}
	}
}
