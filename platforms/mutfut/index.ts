import { context, utils } from '@wikia/ad-engine';
import { basicContext } from '../shared/ad-context';
import { cmpWrapper } from '../shared/cmp/cmp-wrapper';
import { setupAdEngine } from './setup-ad-engine';
import './styles.scss';

async function bootstrap(): Promise<void> {
	const geo = utils.geoService.setUpGeoData().country;

	context.extend(basicContext);

	context.set('custom.isCMPEnabled', cmpWrapper.geoRequiresConsent(geo));
	context.set('options.geoRequiresConsent', cmpWrapper.geoRequiresConsent(geo));

	cmpWrapper.init().then(() => {
		cmpWrapper.getConsent(geo).then((response) => setupAdEngine(response));
	});
}

bootstrap();
