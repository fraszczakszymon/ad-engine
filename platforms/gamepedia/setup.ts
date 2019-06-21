import { AdEngine } from '@wikia/ad-engine';

class AdsSetup {
	init(): AdEngine {
		const engine = new AdEngine();

		engine.init();

		return engine;
	}
}

export const adsSetup = new AdsSetup();
