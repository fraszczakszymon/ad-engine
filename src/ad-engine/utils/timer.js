export class Timer {
	/** @private */
	start = 0;
	/** @private */
	// eslint-disable-next-line no-undef
	clock = performance;

	constructor() {
		this.reset();
	}

	reset() {
		this.start = this.clock.now();
	}

	now() {
		if (this.start) {
			const result = this.clock.now() - this.start;
			return Math.round(result * 100) / 100;
		}
		this.start = this.clock.now();
		return 0;
	}

	log(msg, ...args) {
		// eslint-disable-next-line no-console
		console.log(
			`%c ${msg}`,
			'color: white; background: #6b5b95',
			this.now(),
			...args,
		);
	}
}

export const timer = new Timer();
