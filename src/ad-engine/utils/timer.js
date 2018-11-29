export class Timer {
	/** @private */
	start = 0;
	/** @private */
	// eslint-disable-next-line no-undef
	clock = performance;

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
}

export const timer = new Timer();
