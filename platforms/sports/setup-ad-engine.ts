import { getDeviceMode } from '@platforms/shared';
import { PlatformStartup } from '../shared/setup/platform-startup';
import { setupIoc } from './setup/setup-ioc';

export async function setupAdEngine(isOptedIn: boolean): Promise<void> {
	const container = await setupIoc();
	const platformStartup = container.get(PlatformStartup);

	platformStartup.configure({ isOptedIn, isMobile: getDeviceMode() === 'mobile' });
	platformStartup.run();
}
