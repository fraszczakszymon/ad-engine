import { context } from '@wikia/ad-engine';
import { cmpWrapper } from './cmp/cmp-wrapper';
import { setupAdEngine } from './setup-ad-engine';
import './styles.scss';

const geo = 'PL';

context.set('country', geo);
cmpWrapper.init().then(() => {
	cmpWrapper.getConsent(geo).then((response) => setupAdEngine(response));
});
