import { AdEngine, btfBlockerService, context, events, slotService, utils } from '@wikia/ad-engine';
import { bidders } from '@wikia/ad-bidders';
import { billTheLizard } from '@wikia/ad-services';
import adContext from '../../context';

const contentTemplate = document.querySelector('.content-template').innerHTML;
const mainContainer = document.getElementById('main-container');
const limit = utils.queryString.get('limit') || null;
const contentLength = utils.queryString.get('content_length') || 1;
const randomPrice = utils.queryString.get('random_price') === '1';
const enabledProjects = utils.queryString.get('enabled-project');

function loadContent() {
	const newContent = document.createElement('div');

	newContent.innerHTML = contentTemplate;

	mainContainer.appendChild(newContent);
}

context.extend(adContext);
context.set('slots.repeatable_boxad_1.repeat.limit', limit);
context.push('listeners.slot', {
	onStatusChanged: (adSlot) => {
		const slotName = adSlot.getSlotName();
		const realSlotPrices = bidders.getDfpSlotPrices(slotName);
		const currentSlotPrices = bidders.getCurrentSlotPrices(slotName);

		function transformBidderPrice(bidderName) {
			if (realSlotPrices && realSlotPrices[bidderName]) {
				return realSlotPrices[bidderName];
			}

			if (currentSlotPrices && currentSlotPrices[bidderName]) {
				return `${currentSlotPrices[bidderName]}not_used`;
			}

			return '';
		}

		console.log(`⛳ ${slotName}: wikia adapter price is %c$${transformBidderPrice('wikia')}`, 'font-weight: bold');
	}
});

if (enabledProjects) {
	enabledProjects.split(',').forEach(name => billTheLizard.projectsHandler.enable(name));

	billTheLizard.executor.register('logResult', (model, prediction) => {
		console.log(`🦎 %c${model.name}`, 'font-weight: bold', `predicted ${prediction}`);
	});

	billTheLizard.executor.register('catlapse', () => {
		const slots = document.querySelectorAll('.repeatable-boxad');

		if (slots.length > 0) {
			const slot = slots[slots.length - 1];
			slotService.disable(slot.id, 'catlapsed');
		}
	});

	context.set('bidders.prebid.bidsRefreshing.bidsBackHandler', () => {
		billTheLizard.call(['cheshirecat']);
	});
}

for (let i = 0; i < contentLength; i += 1) {
	loadContent();
}

let resolveBidders;

const biddersDelay = {
	isEnabled: () => true,
	getName: () => 'bidders-delay',
	getPromise: () => new Promise((resolve) => {
		resolveBidders = resolve;
	})
};

context.set('targeting.artid', '266');
context.set('options.maxDelayTimeout', 1000);
context.push('delayModules', biddersDelay);

bidders.requestBids({
	responseListener: () => {
		if (bidders.hasAllResponses()) {
			if (resolveBidders) {
				resolveBidders();
				resolveBidders = null;
			}

			window.pbjs.onEvent('auctionInit', () => {
				if (randomPrice) {
					context.set('bidders.prebid.wikia.price', (Math.floor(Math.random() * 20) * 100));
				}
			});
		}
	}
});

events.on(events.AD_SLOT_CREATED, (slot) => {
	bidders.updateSlotTargeting(slot.getSlotName());
});

new AdEngine().init();

btfBlockerService.finishAboveTheFold();

window.adsQueue.push({
	id: 'repeatable_boxad_1'
});

document.getElementById('requestBids').addEventListener('click', () => {
	bidders.requestBids({});
});
