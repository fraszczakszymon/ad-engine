import { AdSlot, templateService } from '@ad-engine/core';

const BASE_ASSETS_URL = '//static.nocookie.net/fandom-ae-assets/programmatic/latest';

interface SafeFanTakeoverElementConfig {
	campaign: string;
	slotName: string;
}

interface BigFancyAdConfig {
	aspectRatio: {
		default: number;
		resolved: number;
	};
	images: {
		boxad300x250: string;
		boxad300x600?: string;
		default: string;
		resolved: string;
		thumbnail?: string;
	};
}

interface FanTakeoverCampaignConfig {
	desktop: BigFancyAdConfig;
	mobile: BigFancyAdConfig;
	autoplay: boolean;
	clickThroughUrl: string;
	vast?: string;
	uapId: string;
}

export class SafeFanTakeoverElement {

	static getName(): string {
		return 'safeFanTakeoverElement';
	}
	private adContainer: HTMLElement;
	private defaultBackground: HTMLElement;
	private resolvedBackground: HTMLElement;
	private thumbnail: HTMLElement;

	constructor(private adSlot: AdSlot) {}

	init(params: SafeFanTakeoverElementConfig) {
		this.adSlot.getIframe().parentElement.classList.add('hide');

		// FETCH CONFIG PART GOES HERE
		const config: FanTakeoverCampaignConfig = {
			desktop: {
				aspectRatio: {
					default: 4,
					resolved: 10,
				},
				images: {
					boxad300x250:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/boxad.jpg',
					default:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/impact.jpg',
					resolved:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/resolved.jpg',
					thumbnail:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/thumbnail.jpg',
				},
			},
			mobile: {
				aspectRatio: {
					default: 4,
					resolved: 10,
				},
				images: {
					boxad300x250:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/boxad.jpg',
					default:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/impact.jpg',
					resolved:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/resolved.jpg',
					thumbnail:
						'//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/thumbnail.jpg',
				},
			},
			autoplay: true,
			clickThroughUrl: 'https://fandom.com/',
			vast: '//static.nocookie.net/fandom-ae-assets/programmatic/latest/campaign/1/vast.xml',
			uapId: '1',
		};
		// CONFIG FETCHED

		this.createNewAdSlotIframe(config.desktop);
		this.loadTemplate(config.desktop);
	}

	private createNewAdSlotIframe(config: BigFancyAdConfig): void {
		const iframe: HTMLIFrameElement = document.createElement('iframe');
		const divContainer = document.createElement('div');

		divContainer.classList.add('iframe-container');
		divContainer.appendChild(iframe);
		this.adSlot.getElement().appendChild(divContainer);

		iframe.setAttribute('scrolling', 'no');
		iframe.setAttribute('marginwidth', '0');
		iframe.setAttribute('marginheight', '0');
		iframe.setAttribute('frameborder', '0');

		iframe.contentWindow.document.open();
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write(this.createAdContainerHtml(config));
		iframe.contentWindow.document.close();

		this.adContainer = iframe.contentWindow.document.getElementById('adContainer');
		this.defaultBackground = iframe.contentWindow.document.getElementById('defaultBackground');
		this.resolvedBackground = iframe.contentWindow.document.getElementById('resolvedBackground');
		if (config.images.thumbnail) {
			this.thumbnail = iframe.contentWindow.document.getElementById('videoContainer');
		}

		this.adSlot.overrideIframe(iframe);
	}

	private createAdContainerHtml(config: BigFancyAdConfig): string {
		const styles = document.createElement('link');
		const adContainer = document.createElement('div');
		const resolvedBackground = document.createElement('div');
		const defaultBackground = document.createElement('div');
		const thumbnail = document.createElement('div');
		const thumbnailImage = document.createElement('img');

		styles.href = `${BASE_ASSETS_URL}/fan-takeover.css`;
		styles.rel = 'stylesheet';

		adContainer.id = 'adContainer';
		adContainer.classList.add('noselect');

		defaultBackground.id = 'defaultBackground';
		defaultBackground.classList.add('hidden-state');
		this.setBackgroundImage(defaultBackground, config.images.default);

		resolvedBackground.id = 'resolvedBackground';
		resolvedBackground.classList.add('hidden-state');
		this.setBackgroundImage(resolvedBackground, config.images.resolved);

		if (config.images.thumbnail) {
			thumbnail.id = 'videoContainer';
			thumbnail.classList.add('video-element');

			thumbnailImage.id = 'videoThumbnail';
			thumbnailImage.src = config.images.thumbnail;

			thumbnail.appendChild(thumbnailImage);
			adContainer.appendChild(thumbnail);
		}

		adContainer.appendChild(defaultBackground);
		adContainer.appendChild(resolvedBackground);
		adContainer.appendChild(styles);

		return adContainer.outerHTML;
	}

	private loadTemplate(config: BigFancyAdConfig) {
		const templateConfig = {
			aspectRatio: {
				default: config.aspectRatio.default,
				resolved: config.aspectRatio.resolved,
			},
			background: {
				default: config.images.default,
				resolved: config.images.resolved,
			},
			video: {
				thumb: config.images.thumbnail,
			},
			state: {
				height: {
					default: 92,
					resolved: 100,
				},
				width: {
					default: 40.9,
					resolved: 17.8,
				},
				top: {
					default: 4,
					resolved: 0,
				},
			},
		};

		const creative = {
			adType: 'bfaa',
			adProduct: 'vuap',
			player: 'porvata',
			config: templateConfig,
			clickThroughURL: '%%CLICK_URL_UNESC%%[%ClickthroughURL%]',

			image1: {
				element: this.defaultBackground,
				background: templateConfig.background.default,
			},
			image2: {
				element: this.resolvedBackground,
				background: templateConfig.background.resolved,
			},

			aspectRatio: templateConfig.aspectRatio.default,
			resolvedStateAspectRatio: templateConfig.aspectRatio.resolved,
			videoAspectRatio: 16 / 9,
			moatTracking: 1,
			stickyUntilVideoViewed: false,
			stickyAdditionalTime: undefined,
			blockOutOfViewportPausing: true,
			restartOnUnmute: false,
		};

		templateService.init('bfaa', this.adSlot, {
			type: 'bfaa',
			adProduct: 'vuap',
			player: 'porvata',

			isMobile: false,
			config: creative.config,

			slotName: 'hivi_leaderboard',
			src: 'gpt',
			uap: '4973088146',
			lineItemId: '4973088146',
			creativeId: '435',

			isSticky: true,
			backgroundColor: '#000',
			autoPlay: true,
			resolvedStateAutoPlay: true,

			videoTriggers: [],
			videoPlaceholderElement: this.thumbnail,
			splitLayoutVideoPosition: 'right',

			image1: creative.image1,
			image2: creative.image2,
			adContainer: this.adContainer,
			thumbnail: this.thumbnail,

			aspectRatio: creative.aspectRatio,
			resolvedStateAspectRatio: creative.resolvedStateAspectRatio,
			videoAspectRatio: creative.videoAspectRatio,
			theme: 'hivi',
			isDarkTheme: false,
			stickyUntilVideoViewed: creative.stickyUntilVideoViewed,
			stickyAdditionalTime: creative.stickyAdditionalTime,
			blockOutOfViewportPausing: creative.blockOutOfViewportPausing,
			restartOnUnmute: creative.restartOnUnmute,
			clickThroughURL: creative.clickThroughURL,
			fullscreenable: true,

			loadMedrecFromBTF: false,
			moatTracking: creative.moatTracking,
		});
	}

	private setBackgroundImage(element: HTMLElement, imageUrl: string) {
		element.style.backgroundImage = `url('${imageUrl}')`;
	}
}
