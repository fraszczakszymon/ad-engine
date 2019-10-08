import { bootstrapAndGetCmpConsent, getDeviceMode } from '@platforms/shared';
import { context } from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { PlatformStartup } from '../shared/setup/platform-startup';
import { basicContext } from './ad-context';
import { setupIoc } from './setup/setup-ioc';
import './styles.scss';

async function start(): Promise<void> {
	context.extend(basicContext);

	const consent: boolean = await bootstrapAndGetCmpConsent();
	const container: Container = await setupIoc();
	const platformStartup = container.get(PlatformStartup);

	platformStartup.configure({ isOptedIn: consent, isMobile: getDeviceMode() === 'mobile' });
	platformStartup.run();
}

start();
