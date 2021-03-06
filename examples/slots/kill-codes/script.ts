import { AdEngine, utils } from '@wikia/ad-engine';
import context from '../../context';

const disableBtf = utils.queryString.get('disableBtf') || false;
const disableSecondCall = utils.queryString.get('disableSecondCall') || false;

window.ads.runtime = window.ads.runtime || {};
window.ads.runtime.disableBtf = JSON.parse(disableBtf as any);
window.ads.runtime.disableSecondCall = JSON.parse(disableSecondCall as any);

new AdEngine(context).init();
