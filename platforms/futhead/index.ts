import { bootstrapAndGetCmpConsent, getDeviceMode, PlatformStartup } from '@platforms/shared';
import { context } from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { basicContext } from './ad-context';
import { setupIoc } from './setup/setup-ioc';
// tslint:disable-next-line:no-implicit-dependencies no-submodule-imports ordered-imports
import 'platforms/shared-sports/styles.scss';

async function start(): Promise<void> {
	context.extend(basicContext);

	const consent: boolean = await bootstrapAndGetCmpConsent();
	const container: Container = await setupIoc();
	const platformStartup = container.get(PlatformStartup);

	platformStartup.configure({ isOptedIn: consent, isMobile: getDeviceMode() === 'mobile' });
	platformStartup.run();
}

start();
