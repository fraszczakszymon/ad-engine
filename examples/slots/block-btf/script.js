import { AdEngine } from '@wikia/ad-engine';
import context from '../../context';

window.ads.runtime = window.ads.runtime || {};
window.ads.runtime.disableBtf = true;

new AdEngine(context).init();
