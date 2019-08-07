import { bootstrapAndGetCmpConsent } from '../shared/bootstrap';
import { setupAdEngine } from './setup-ad-engine';
import './styles.scss';

async function start(): Promise<void> {
	const consent: boolean = await bootstrapAndGetCmpConsent();

	setupAdEngine(consent);
}

start();
