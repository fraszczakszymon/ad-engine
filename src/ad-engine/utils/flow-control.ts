import { EventEmitter } from 'eventemitter3';

export const wait = (milliseconds = 0) =>
	new Promise((resolve, reject) => {
		if (typeof milliseconds !== 'number') {
			reject(new Error('Delay value must be a number.'));

			return;
		}

		setTimeout(resolve, milliseconds);
	});

export function defer<T>(fn: (...args: any) => T, ...args: any): Promise<T> {
	return new Promise((resolve, reject) => {
		if (typeof fn !== 'function') {
			reject(new Error('Expected a function.'));

			return;
		}

		setTimeout(() => resolve(fn(...args)), 0);
	});
}

export class EE extends EventEmitter {}

export function once(emitter: EE | Window, eventName: string, options = {}): Promise<any> {
	const isObject: boolean = typeof emitter === 'object';
	const hasAddEventListener: boolean =
		isObject && typeof (emitter as Window).addEventListener === 'function';
	const hasOnce: boolean = isObject && typeof (emitter as EE).once === 'function';

	return new Promise((resolve, reject) => {
		if (typeof options === 'boolean') {
			options = { capture: options };
		}

		if (hasOnce) {
			(emitter as EE).once(eventName, resolve);
		} else if (hasAddEventListener) {
			(emitter as Window).addEventListener(eventName, resolve, { ...options, once: true });
		} else {
			reject(new Error('Emitter does not have `addEventListener` nor `once` method.'));
		}
	});
}

export function timeoutReject(msToTimeout: number): Promise<any> {
	return new Promise((resolve, reject) => {
		setTimeout(reject, msToTimeout);
	});
}

/**
 * Fires the Promise if function is fulfilled or timeout is reached
 */
export function createWithTimeout(func: (...args: any) => any, msToTimeout = 2000): Promise<any> {
	return Promise.race([new Promise(func), timeoutReject(msToTimeout)]);
}
