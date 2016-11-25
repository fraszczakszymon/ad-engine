import AdEngine from 'ad-engine/ad-engine';
import Context from '../../context';

Context.set('state.adStack', window.adsQueue);
Context.set('targeting.s1', '_project43');

new AdEngine().init();

let action = 'collapse';
setInterval(() => {
	console.info(`Send message "${action}"`);
	window.postMessage(`{"AdEngine":{"action":"${action}","slotName":"TOP_LEADERBOARD"}}`, '*');
	action = action === 'collapse' ? 'expand' : 'collapse';
}, 5000);
