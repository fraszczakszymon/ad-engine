import { AdEngine, context, events, utils as adEngineUtils } from '@wikia/ad-engine';
import { bidders } from '@wikia/ad-bidders';
import { utils as adProductsUtils } from '@wikia/ad-products';
import customContext from '../../context';
import '../../styles.scss';

context.extend(customContext);
context.set('slots.bottom_leaderboard.disabled', false);
context.set('state.providers.gpt', false);
context.set('state.providers.prebidium', true);

adProductsUtils.setupNpaContext();

let resolveBidders;

const biddersDelay = {
	isEnabled: () => true,
	getName: () => 'bidders-delay',
	getPromise: () => new Promise((resolve) => {
		console.log(
			'%c script getPromise', 'color: white; background: #6b5b95',
			adEngineUtils.timer.now(),
		);
		resolveBidders = resolve;
	}),
};

context.set('options.maxDelayTimeout', 1000);
context.push('delayModules', biddersDelay);

console.log(
	'%c Request Bids', 'color: white; background: #6b5b95',
	adEngineUtils.timer.now(),
);
bidders.requestBids({
	responseListener: (...args) => {
		console.log(
			'%c script ResponseListener', 'color: white; background: #6b5b95',
			adEngineUtils.timer.now(),
			args,
			{ ...window.pbjs.getBidResponses() }
		);
		if (bidders.hasAllResponses()) {
			console.log(
				'%c script ResponseListener if', 'color: white; background: #6b5b95',
				adEngineUtils.timer.now(),
			);
			if (resolveBidders) {
				resolveBidders();
				resolveBidders = null;
			}
		}
	},
});

events.on(events.AD_SLOT_CREATED, (slot) => {
	bidders.updateSlotTargeting(slot.getSlotName());
});

setTimeout(() => {
	const bids = window.pbjs.getBidResponses();
	Object.keys(bids)
		.forEach((key) => {
			const bid = bids[key].bids[0];
			const doc = document.getElementById(`${bid.adUnitCode}`);
			const iframe = doc.appendChild(document.createElement('iframe'));
			const adId = bid.adId;
			console.log(
				'%c script pbjs', 'color: white; background: #6b5b95',
				adEngineUtils.timer.now(),
				{
					doc,
					adId,
				},
			);
			window.pbjs.renderAd(iframe.contentWindow.document, adId);
		});
}, 1000);

new AdEngine().init();
