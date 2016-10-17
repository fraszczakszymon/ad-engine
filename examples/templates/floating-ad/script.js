/* eslint import/no-unresolved: 0, import/extensions: 0*/
import AdEngine from 'ad-engine/ad-engine';
import Context from '../../context';

Context.set('state.adStack', window.adsQueue);
Context.set('targeting.s1', '_project43');

new AdEngine().init();
