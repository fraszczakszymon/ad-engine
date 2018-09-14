import { AdEngine, context, utils } from '@wikia/ad-engine';
import { krux } from '@wikia/ad-services';
import adContext from '../../context';

const isKruxEnabled = utils.queryString.get('krux-disabled') !== '1';

context.extend(adContext);
context.set('services.krux.enabled', isKruxEnabled);

krux.call().then(() => {
	document.getElementById('user').innerText = krux.getUserId();
	document.getElementById('segments').innerText = krux.getSegments().join('\n');
})

setTimeout(() => {
	new AdEngine().init();
}, 1000);
