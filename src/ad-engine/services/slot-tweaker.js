import { messageBus } from './message-bus';
import { slotService } from './slot-service';
import { logger } from '../utils';

const logGroup = 'slot-tweaker';

class SlotTweaker {
	forceRepaint(domElement) {
		return domElement.offsetWidth;
	}

	getContainer(adSlot) {
		const container = document.getElementById(adSlot.getSlotName());

		if (!container) {
			logger(logGroup, 'cannot find container', adSlot.getSlotName());
		}

		return container;
	}

	hide(adSlot) {
		const container = this.getContainer(adSlot);

		if (container) {
			logger(logGroup, 'hide', adSlot.getSlotName());
			container.classList.add('hide');
		}
	}

	show(adSlot) {
		const container = this.getContainer(adSlot);

		if (container) {
			logger(logGroup, 'show', adSlot.getSlotName());
			container.classList.remove('hide');
		}
	}

	collapse(adSlot) {
		const container = this.getContainer(adSlot);

		container.style.maxHeight = `${container.scrollHeight}px`;
		this.forceRepaint(container);
		container.classList.add('slot-animation');
		container.style.maxHeight = '0';
	}

	expand(adSlot) {
		const container = this.getContainer(adSlot);

		container.style.maxHeight = `${container.offsetHeight}px`;
		container.classList.remove('hide');
		container.classList.add('slot-animation');
		container.style.maxHeight = `${container.scrollHeight}px`;
	}

	makeResponsive(adSlot, aspectRatio = null) {
		const slotContainer = this.getContainer(adSlot);

		slotContainer.classList.add('slot-responsive');

		return this.onReady(adSlot)
			.then((iframe) => {
				const container = iframe.parentElement;
				if (!aspectRatio) {
					const height = iframe.contentWindow.document.body.scrollHeight,
						width = iframe.contentWindow.document.body.scrollWidth;

					aspectRatio = width / height;
				}

				logger(logGroup, 'make responsive', adSlot.getSlotName());
				container.style.paddingBottom = `${100 / aspectRatio}%`;
				return iframe;
			});
	}

	onReady(adSlot) {
		const container = this.getContainer(adSlot),
			iframe = container.querySelector('div[id*="_container_"] iframe');

		return new Promise((resolve, reject) => {
			if (!iframe) {
				reject(new Error('Cannot find iframe element'));
			}

			if (iframe.contentWindow.document.readyState === 'complete') {
				resolve(iframe);
			} else {
				iframe.addEventListener('load', () => resolve(iframe));
			}
		});
	}

	adjustIframeByContentSize(adSlot) {
		this.onReady(adSlot).then((iframe) => {
			const height = iframe.contentWindow.document.body.scrollHeight;
			const width = iframe.contentWindow.document.body.scrollWidth;

			iframe.width = width;
			iframe.height = height;

			logger(logGroup, 'adjust size', adSlot.getSlotName(), width, height);
		});
	}

	registerMessageListener() {
		messageBus.register({
			keys: ['action', 'slotName'],
			infinite: true
		}, (data) => {
			if (!data.slotName) {
				logger(logGroup, 'Missing slot name');
				return;
			}

			const adSlot = slotService.get(data.slotName);

			switch (data.action) {
				case 'expand':
					this.expand(adSlot);
					break;
				case 'collapse':
					this.collapse(adSlot);
					break;
				case 'hide':
					this.hide(adSlot);
					break;
				case 'show':
					this.show(adSlot);
					break;
				case 'make-responsive':
					this.makeResponsive(adSlot, data.aspectRatio);
					break;
				default:
					logger(logGroup, 'Unknown action', data.action);
			}
		});
	}

	setDataParam(adSlot, attrName, data) {
		const container = this.getContainer(adSlot);

		container.dataset[attrName] = typeof data === 'string' ?
			data :
			JSON.stringify(data);
	}
}

export const slotTweaker = new SlotTweaker();
