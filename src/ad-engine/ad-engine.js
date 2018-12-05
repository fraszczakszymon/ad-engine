import { logger, makeLazyQueue } from './utils';
import { AdSlot } from './models';
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

const logGroup = 'ad-engine';

// TODO: Move to BaseProvider class
function fillInUsingProvider(ad, provider) {
	const adSlot = new AdSlot(ad);

	slotService.add(adSlot);

	btfBlockerService.push(adSlot, arg => provider.fillIn(arg));
}

function getPromises() {
	return (context.get('delayModules') || [])
		.filter(module => module.isEnabled())
		.map((module) => {
			logger(logGroup, 'Register delay module', module.getName());

			return module.getPromise();
		}) || [];
}

export class AdEngine {
	constructor(config = null) {
		context.extend(config);
		this.providers = new Map();
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
			case 'gpt':
				this.provider = new GptProvider();
				break;
			case 'prebidium':
				this.provider = new PrebidiumProvider();
				break;
			default:
				throw new Error('Not implemented provider');
		}
	}

	setupQueue() {
		this.adStack = context.get('state.adStack');
		if (!this.adStack.start) {
			makeLazyQueue(this.adStack, (ad) => {
				fillInUsingProvider(ad, this.provider);

				if (this.adStack.length === 0) {
					this.provider.flush();
				}
			});
		}
	}

	runAdQueue() {
		let timeout = null;

		const promises = getPromises(),
			startAdQueue = () => {
				if (!this.started) {
					events.emit(events.AD_STACK_START);
					this.started = true;
					clearTimeout(timeout);
					this.adStack.start();
				}
			},
			maxTimeout = context.get('options.maxDelayTimeout');

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

	/**
	 * Returns GptProvider if it is set in context
	 * @deprecated
	 * @param name
	 * @returns {any}
	 */
	getProvider(name) {
		if (name === 'gpt') {
			return this.provider;
		}
		throw new Error('Deprecated method, supports only Gpt');
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
			const pushOnScrollQueue = context.get('events.pushOnScroll.ids');

			makeLazyQueue(pushOnScrollQueue, (id) => {
				scrollListener.addSlot(this.adStack, id, context.get('events.pushOnScroll.threshold'));
			});
			pushOnScrollQueue.start();
		}
	}
}
