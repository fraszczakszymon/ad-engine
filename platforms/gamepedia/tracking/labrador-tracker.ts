import { LabradorTracker, PageTracker } from '@platforms/shared';
import { InstantConfigCacheStorage } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';

@Injectable()
export class GamepediaLabradorTracker implements LabradorTracker {
	trackLabradorValues(): void {
		const cacheStorage = InstantConfigCacheStorage.make();
		const labradorPropValue = cacheStorage.getSamplingResults().join(';');

		if (labradorPropValue) {
			PageTracker.trackProp('labrador', labradorPropValue);
		}
	}
}
