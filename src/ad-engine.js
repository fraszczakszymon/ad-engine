import { logger, makeLazyQueue } from './utils';
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

const logGroup = 'ad-engine';

function fillInUsingProvider(ad, provider) {
	const adSlot = new AdSlot(ad);

	slotService.add(adSlot);
	btfBlockerService.push(adSlot, provider.fillIn.bind(provider));
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
		this.adStack = context.get('state.adStack');
		this.providers = new Map();

		window.ads = window.ads || {};
		window.ads.runtime = window.ads.runtime || {};

		templateService.register(FloatingAd);
	}

	setupProviders() {
		this.providers.set('gpt', new GptProvider());

		makeLazyQueue(this.adStack, (ad) => {
			const gpt = this.providers.get('gpt');

			fillInUsingProvider(ad, gpt);

			if (this.adStack.length === 0) {
				gpt.flush();
			}
		});
	}

	runAdQueue() {
		let started = false,
			timeout = null;

		const promises = getPromises(),
			startAdQueue = () => {
				if (!started) {
					started = true;
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

	getProvider(name) {
		return this.providers.get(name);
	}

	init() {
		this.setupProviders();
		btfBlockerService.init();

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
