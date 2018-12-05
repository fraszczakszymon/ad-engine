import { AdEngine, context, events } from '@wikia/ad-engine';
import { bidders } from '@wikia/ad-bidders';
import { utils as adProductsUtils } from '@wikia/ad-products';
import customContext from '../../context';
import '../../styles.scss';

context.extend(customContext);
context.set('slots.bottom_leaderboard.disabled', false);
context.set('state.provider', 'prebidium');

adProductsUtils.setupNpaContext();

let resolveBidders;

const biddersDelay = {
	isEnabled: () => true,
	getName: () => 'bidders-delay',
	getPromise: () => new Promise((resolve) => {
		resolveBidders = resolve;
	}),
};

context.set('options.maxDelayTimeout', 1000);
context.push('delayModules', biddersDelay);

bidders.requestBids({
	responseListener: () => {
		if (bidders.hasAllResponses()) {
			// renderBids();
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

// function renderBids() {
// // 	const bids = window.pbjs.getBidResponses();
// // 	Object.keys(bids)
// // 		.forEach((key) => {
// // 			const bid = bids[key].bids[0];
// // 			const doc = document.getElementById(`${bid.adUnitCode}`);
// // 			const iframe = doc.appendChild(document.createElement('iframe'));
// // 			const adId = bid.adId;
// // 			window.pbjs.renderAd(iframe.contentWindow.document, adId);
// // 		});
// // }

new AdEngine().init();
