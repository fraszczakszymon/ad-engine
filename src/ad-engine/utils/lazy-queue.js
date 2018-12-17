export function makeLazyQueue(queue, callback) {
	if (typeof callback !== 'function') {
		throw new Error('LazyQueue used with callback not being a function');
	} else if (queue instanceof Array) {
		queue.start = function () {
			while (queue.length > 0) {
				callback(queue.shift());
			}
			queue.push = function (item) {
				callback(item);
			};
		};
	} else {
		throw new Error('LazyQueue requires an array as the first parameter');
	}
}

// TODO: Proposal
// example: https://stackblitz.com/edit/wikia-lazy-queue
export class LazyQueue {
	// itemFlushed = {}; // RxJs Subject
	/** @private */
	itemFlushCallbacks = [];
	/** @private */
	pushCommand = undefined;
	/** @private */
	array = [];

	constructor(...items) {
		this.array = [...items];
		this.setPreFlushPush();
	}

	// old start
	flush() {
		while (this.array.length > 0) {
			this.emit(this.array.shift());
		}
		this.setPostFlushPush();
	}

	push(...items) {
		this.pushCommand(...items);
	}

	/**
	 * @param {function} callback
	 */
	onItemFlush(callback) {
		if (typeof callback !== 'function') {
			throw new Error('onItemFlush used with callback not being a function');
		}
		this.itemFlushCallbacks.push(callback);
	}

	/** @private */
	setPreFlushPush() {
		this.pushCommand = (...items) => {
			this.array.push(...items);
		};
	}

	/** @private */
	setPostFlushPush() {
		this.pushCommand = (...items) => {
			items.forEach((item) => {
				this.emit(item);
			});
		};
	}

	/** @private */
	emit(item) {
		// this.flushed.next(item);
		this.itemFlushCallbacks.forEach((flushCallback) => {
			flushCallback(item);
		});
	}
}
