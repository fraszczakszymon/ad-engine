import { makeLazyQueue } from './utils';
import { AdSlot } from './models';
import { FloatingAd } from './templates';
import { GptProvider } from './providers';
import { scrollListener } from './listeners';
import {
	btfBlockerService,
	slotTweaker,
	slotService,
	templateService,
	registerCustomAdLoader,
	context,
	messageBus
} from './services';

function fillInUsingProvider(ad, provider) {
	const adSlot = new AdSlot(ad);

	if (adSlot.shouldLoad()) {
		slotService.add(adSlot);
		btfBlockerService.push(adSlot, provider.fillIn.bind(provider));
	}
}

export class AdEngine {
	constructor(config = null) {
		context.extend(config);
		this.adStack = context.get('state.adStack');

		window.ads = window.ads || {};
		window.ads.runtime = window.ads.runtime || {};

		templateService.register(FloatingAd);
	}

	runAdQueue() {
		let started = false,
			timeout = null;

		const promises = context.get('delayModules').map(module => module.isEnabled() && module.getPromise()) || [],
			startAdQueue = () => {
				if (!started) {
					started = true;
					clearTimeout(timeout);
					this.adStack.start();
				}
			};

		Promise.all(promises).then(startAdQueue);
		if (promises.length > 0) {
			timeout = setTimeout(startAdQueue, context.get('options.maxDelayTimeout'));
		}
	}

	init() {
		const provider = new GptProvider();
		btfBlockerService.init();

		makeLazyQueue(this.adStack, (ad) => {
			fillInUsingProvider(ad, provider);

			if (this.adStack.length === 0) {
				provider.flush();
			}
		});
		registerCustomAdLoader(context.get('options.customAdLoader.globalMethodName'));
		messageBus.init();
		slotTweaker.registerMessageListener();
		this.runAdQueue();

		scrollListener.init();

		if (context.get('events.pushOnScroll')) {
			context.get('events.pushOnScroll.ids').forEach((id) => {
				scrollListener.addSlot(this.adStack, id, context.get('events.pushOnScroll.threshold'));
			});
		}
	}
}
