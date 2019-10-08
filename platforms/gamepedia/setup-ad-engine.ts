import { PageTracker } from '@platforms/shared';
import { InstantConfigCacheStorage, utils } from '@wikia/ad-engine';
import { PlatformStartup } from '../shared/setup/platform-startup';
import { setupIoc } from './setup/setup-ioc';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	const container = await setupIoc();
	const platformStartup = container.get(PlatformStartup);

	platformStartup.configure({ isOptedIn, isMobile: !utils.client.isDesktop() });
	platformStartup.run();

	trackLabradorValues();
}

function trackLabradorValues(): void {
	const cacheStorage = InstantConfigCacheStorage.make();
	const labradorPropValue = cacheStorage.getSamplingResults().join(';');

	if (labradorPropValue) {
		PageTracker.trackProp('labrador', labradorPropValue);
	}
}
