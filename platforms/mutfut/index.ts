import { context } from '@wikia/ad-engine';
import { basicContext } from '../gamepedia/ad-context';
import { cmpWrapper } from './cmp/cmp-wrapper';
import { setupAdEngine } from './setup-ad-engine';
import './styles.scss';

const geo = 'PL';

context.set('country', geo);
context.set('custom.isCMPEnabled', cmpWrapper.geoRequiresConsent(geo));
context.set('options.geoRequiresConsent', cmpWrapper.geoRequiresConsent(geo));

cmpWrapper.init().then(() => {
	context.extend(basicContext);
	cmpWrapper.getConsent(geo).then((response) => setupAdEngine(response));
});
