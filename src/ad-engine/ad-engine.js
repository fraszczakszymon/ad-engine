import { LazyQueue, logger } from './utils';
import { FloatingAd } from './templates';
import { GptProvider, PrebidiumProvider } from './providers';
import { scrollListener } from './listeners';
import {
	btfBlockerService,
	context,
	events,
	messageBus,
	registerCustomAdLoader,
	slotRepeater,
	slotService,
	slotTweaker,
	templateService,
} from './services';
import { AdSlot } from './models';

const logGroup = 'ad-engine';

function getPromises() {
	return (
		(context.get('delayModules') || [])
			.filter((module) => module.isEnabled())
			.map((module) => {
				logger(logGroup, 'Register delay module', module.getName());

				return module.getPromise();
			}) || []
	);
}

export class AdEngine {
	constructor(config = null) {
		context.extend(config);
		this.started = false;

		window.ads = window.ads || {};
		window.ads.runtime = window.ads.runtime || {};

		templateService.register(FloatingAd);

		events.on(events.PAGE_CHANGE_EVENT, () => {
			this.started = false;
			this.setupQueue();
		});
	}

	setupProviders() {
		const providerName = context.get('state.provider');

		switch (providerName) {
			case 'prebidium':
				this.provider = new PrebidiumProvider();
				break;
			case 'gpt':
			default:
				this.provider = new GptProvider();
		}
	}

	setupQueue() {
		const adStack = context.get('state.adStack');

		if (adStack instanceof LazyQueue) {
			return;
		}

		this.adStack = new LazyQueue(adStack);
		this.adStack.onItemFlush((ad) => {
			const adSlot = new AdSlot(ad);

			slotService.add(adSlot);
			this.provider.fillIn(adSlot);
		});
		context.set('state.adStack', this.adStack);
	}

	runAdQueue() {
		let timeout = null;

		const promises = getPromises();
		const startAdQueue = () => {
			if (!this.started) {
				events.emit(events.AD_STACK_START);
				this.started = true;
				clearTimeout(timeout);
				this.adStack.flush();
			}
		};

		const maxTimeout = context.get('options.maxDelayTimeout');

		logger(logGroup, `Delay by ${promises.length} modules (${maxTimeout}ms timeout)`);

		if (promises.length > 0) {
			Promise.all(promises).then(() => {
				logger(logGroup, 'startAdQueue', 'All modules ready');
				startAdQueue();
			});
			timeout = setTimeout(() => {
				logger(logGroup, 'startAdQueue', 'Timeout reached');
				startAdQueue();
			}, maxTimeout);
		} else {
			startAdQueue();
		}
	}

	init() {
		this.setupProviders();
		this.setupQueue();
		btfBlockerService.init();

		registerCustomAdLoader(context.get('options.customAdLoader.globalMethodName'));
		messageBus.init();
		slotTweaker.registerMessageListener();
		this.runAdQueue();

		scrollListener.init();
		slotRepeater.init();

		if (context.get('events.pushOnScroll')) {
			const pushOnScrollIds = context.get('events.pushOnScroll.ids');
			const pushOnScrollQueue = new LazyQueue(pushOnScrollIds);

			pushOnScrollQueue.onItemFlush((id) => {
				scrollListener.addSlot(this.adStack, id, context.get('events.pushOnScroll.threshold'));
			});
			context.set('events.pushOnScroll.ids', pushOnScrollQueue);
			pushOnScrollQueue.flush();
		}
	}
}
