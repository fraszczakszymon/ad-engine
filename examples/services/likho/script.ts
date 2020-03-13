import { AdEngine, context, likhoService, localCache, setupNpaContext } from '@wikia/ad-engine';
import { Communicator, setupPostQuecast } from '@wikia/post-quecast';
import customContext from '../../context';
import '../../styles.scss';

setupPostQuecast();

console.log('** bielik');

const communicator = new Communicator();

communicator.actions$.subscribe((action) => console.log('** ad-engine', action));
communicator.dispatch({ type: 'ad-engine test' });

setTimeout(() => {
	communicator.dispatch({ type: 'ad-engine test 2' });
}, 3000);

// @ts-ignore
window.guaTrackEvent = (...args) => {
	console.log(`🛤 Custom tracker: ${args}`);
};

context.extend(customContext);
context.set('targeting.artid', '535');
context.set('targeting.likho', likhoService.refresh());
context.set('slots.top_leaderboard.sizes', [
	{
		viewportSize: [728, 0],
		sizes: [
			[728, 90],
			[3, 3],
		],
	},
	{
		viewportSize: [970, 0],
		sizes: [
			[970, 250],
			[3, 3],
		],
	},
]);

if (document.body.offsetWidth < 728) {
	context.set('state.isMobile', true);
	context.set('targeting.skin', 'fandom_mobile');
}

setupNpaContext();

new AdEngine().init();

document.getElementById('reset').addEventListener('click', () => {
	localCache.delete('likho');
	console.log(`💾 Likho storage: reset`);
});
