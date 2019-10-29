declare const window: Window & { googletag: googletag.Googletag };

window.googletag = window.googletag || ({} as googletag.Googletag);
window.googletag.cmd = window.googletag.cmd || [];

class GptFactory {
	private instancePromise: Promise<googletag.Googletag>;

	init(): Promise<googletag.Googletag> {
		if (!this.instancePromise) {
			this.instancePromise = new Promise((resolve) =>
				window.googletag.cmd.push(() => resolve(window.googletag as any)),
			);
		}

		return this.instancePromise;
	}
}

export const gptFactory = new GptFactory();
