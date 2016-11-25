import { makeLazyQueue } from './utils/lazy-queue';
import AdSlot from './models/ad-slot';
import Context from './services/context-service';
import FloatingAd from './templates/floating-ad';
import GptProvider from './providers/gpt-provider';
import MessageBus from './services/message-bus';
import ScrollListener from './listeners/scroll-listener';
import SlotService from './services/slot-service';
import SlotTweaker from './services/slot-tweaker';
import TemplateService from './services/template-service';

function fillInUsingProvider(ad, provider) {
	const adSlot = new AdSlot(ad);

	if (adSlot.shouldLoad()) {
		SlotService.add(adSlot);
		provider.fillIn(adSlot);
	}
}

export default class AdEngine {
	constructor() {
		this.adStack = Context.get('state.adStack');

		window.ads = window.ads || {};
		window.ads.runtime = window.ads.runtime || {};

		TemplateService.register('floating-ad', FloatingAd);
	}

	init() {
		const provider = new GptProvider();

		makeLazyQueue(this.adStack, (ad) => {
			fillInUsingProvider(ad, provider);

			if (this.adStack.length === 0) {
				provider.flush();
			}
		});
		MessageBus.init();
		SlotTweaker.registerMessageListener();
		this.adStack.start();

		ScrollListener.init();

		if (Context.get('events.pushOnScroll')) {
			Context.get('events.pushOnScroll.ids').forEach((id) => {
				ScrollListener.addSlot(this.adStack, id, Context.get('events.pushOnScroll.threshold'));
			});
		}
	}
}
