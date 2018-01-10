import AdEngine from 'ad-engine/ad-engine';
import Context from 'ad-engine/services/context-service';
import adContext from '../../context';

Context.extend(adContext);
Context.set('src', 'incorrect-src');

new AdEngine().init();
