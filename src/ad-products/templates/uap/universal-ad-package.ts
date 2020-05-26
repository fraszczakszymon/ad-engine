import {
	AdSlot, adSlotEvent, btfBlockerService, context, DomListener, eventService, slotService, utils,
} from '@ad-engine/core';
import { filter, take } from 'rxjs/operators';
import { action, props } from 'ts-action';
import { ofType } from 'ts-action-operators';
import { isUndefined } from 'util';
import { Porvata, PorvataPlayer } from '../../video/player/porvata/porvata';
import * as videoUserInterface from '../interface/video';
import * as constants from './constants';
import { UapVideoSettings } from './uap-video-settings';

let uapCreativeId = constants.DEFAULT_UAP_ID;
let uapId = constants.DEFAULT_UAP_ID;
let uapType = constants.DEFAULT_UAP_TYPE;

export interface UapState<T> {
	default: T;
	resolved: T;
}

export type UapRatio = UapState<number>;

export interface UapConfig {
	aspectRatio: UapRatio;
	background: UapState<string>;
	video: {
		thumb: string;
	};
	state: {
		height: UapState<number>;
		top?: UapState<number>;
		right?: UapState<number>;
		bottom?: UapState<number>;
	};
}

export interface UapImage {
	element: HTMLImageElement;
	background?: string;
}

export interface VideoSize {
	height: number;
	width: number;
}

export interface UapParams {
	adContainer: HTMLElement;
	adProduct: string;
	aspectRatio: number;
	autoPlay: boolean;
	backgroundColor: string;
	blockOutOfViewportPausing: boolean;
	clickThroughURL: string;
	config: UapConfig;
	container: HTMLElement;
	creativeId: string;
	fullscreenable: boolean;
	fullscreenAllowed: boolean;
	image1: UapImage;
	image2?: UapImage;
	isDarkTheme: boolean;
	isMobile: boolean;
	isSticky: boolean;
	lineItemId: string;
	loadMedrecFromBTF: boolean;
	moatTracking: boolean;
	player: HTMLElement;
	resolvedStateAspectRatio: number;
	resolvedStateAutoPlay: boolean;
	resolvedStateForced?: boolean;
	restartOnUnmute: boolean;
	slotName: string;
	splitLayoutVideoPosition: string;
	src: string;
	stickyAdditionalTime: number;
	stickyUntilVideoViewed: boolean;
	theme: string;
	thumbnail: HTMLElement;
	uap: string;
	videoAspectRatio: number;
	videoPlaceholderElement: HTMLElement;
	videoTriggers: any[];

	// Video
	vastTargeting: {};
	videoTriggerElement: HTMLVideoElement;
	type: string;

	height: number;
	width: number;
}

export const uapLoadStatus = action('[AdEngine] UAP Load status', props<{ isLoaded: boolean }>());

export interface UapVideoSize {
	width: number;
	height: number;
	top?: number;
	right?: number;
	bottom?: number;
}

class UapSizeHelper {
	constructor(private params: UapParams, private adSlotElement: HTMLElement) {}

	getVideoSizeImpactToResolved(): UapVideoSize {
		return this.calculateVideoSize(
			this.getSlotHeightImpactToResolved(),
			this.getProgressImpactToResolved(),
		);
	}

	private calculateVideoSize(slotHeight: number, progress: number): UapVideoSize {
		const { height, width } = this.getSize(slotHeight, progress);
		const top = this.getPercentage(progress, this.params.config.state.top);
		const right = this.getPercentage(progress, this.params.config.state.right);
		const bottom = this.getPercentage(progress, this.params.config.state.bottom);

		return {
			top,
			right,
			bottom,
			height: Math.ceil(height),
			width: Math.ceil(width),
		};
	}

	private getSize(slotHeight: number, progress: number): { height: number; width: number } {
		const percentage = this.getPercentage(progress, this.params.config.state.height);
		const height = slotHeight * (percentage / 100);
		const width = height * this.params.videoAspectRatio;

		return { height, width };
	}

	private getPercentage(progress: number, state?: UapState<number>): number | undefined {
		if (!state) {
			return;
		}

		const { default: impact, resolved } = state;

		return impact - (impact - resolved) * progress;
	}

	private getSlotHeightImpactToResolved(): number {
		const mixHeight = this.getSlotHeightResolved();
		const maxHeight = this.getSlotHeightImpact();
		const progress = this.getProgressImpactToResolved();

		return maxHeight - (maxHeight - mixHeight) * progress;
	}

	/**
	 * Progress changes between 0 (impact, full height) to 1 (resolved size);
	 */
	private getProgressImpactToResolved(): number {
		const mixHeight = this.getSlotHeightResolved();
		const maxHeight = this.getSlotHeightImpact();
		const progress = window.scrollY / (maxHeight - mixHeight);

		return progress >= 1 ? 1 : progress;
	}

	private getSlotHeightImpact(): number {
		if (isUndefined(this.params?.config?.aspectRatio?.default)) {
			return this.adSlotElement.offsetHeight;
		}

		return this.calculateSlotHeight(this.params.config.aspectRatio.default);
	}

	private getSlotHeightResolved(): number {
		if (isUndefined(this.params?.config?.aspectRatio?.resolved)) {
			return this.adSlotElement.offsetHeight;
		}

		return this.calculateSlotHeight(this.params.config.aspectRatio.resolved);
	}

	private calculateSlotHeight(ratio: number): number {
		return (1 / ratio) * this.adSlotElement.offsetWidth;
	}
}

function getVideoSize(
	slot: HTMLElement,
	params: UapParams,
	videoSettings: UapVideoSettings,
): VideoSize {
	const { width, height} = new UapSizeHelper(params, slot).getVideoSizeImpactToResolved();

	// const width: number = videoSettings.isSplitLayout()
	// 	? params.videoPlaceholderElement.offsetWidth
	// 	: slot.clientWidth;
	// const height = width / params.videoAspectRatio;

	console.log('** getVideoSize', {
		width,
		height,
		isSplitLayout: videoSettings.isSplitLayout(),
		clientWidth: slot.clientWidth,
		offsetWidth: params.videoPlaceholderElement.offsetWidth,
		videoPlaceholderElement: params.videoPlaceholderElement,
		aspectRatio: params.videoAspectRatio,
	});

	return {
		height,
		width: videoSettings.isSplitLayout() ? width : slot.clientWidth,
	};
}

function adjustVideoAdContainer(params: UapParams): void {
	if (params.splitLayoutVideoPosition) {
		const videoAdContainer = params.container.querySelector('.video-player');

		videoAdContainer.classList.add(`video-player-${params.splitLayoutVideoPosition}`);
	}
}

async function loadPorvata(videoSettings, slotContainer, imageContainer): Promise<PorvataPlayer> {
	const params = videoSettings.getParams();
	const template = videoUserInterface.selectTemplate(videoSettings);

	params.autoPlay = videoSettings.isAutoPlay();
	videoSettings.updateParams(params);

	const video = await Porvata.inject(params);

	video.container.style.position = 'relative';
	videoUserInterface.setup(video, video.container, template, {
		autoPlay: videoSettings.isAutoPlay(),
		image: imageContainer,
		container: slotContainer,
		thumbnail: params.thumbnail,
		clickThroughURL: params.clickThroughURL,
		aspectRatio: params.aspectRatio,
		videoAspectRatio: params.videoAspectRatio,
		hideWhenPlaying: params.videoPlaceholderElement || params.image,
		splitLayoutVideoPosition: params.splitLayoutVideoPosition,
	});

	video.addEventListener('wikiaAdCompleted', () => {
		video.reload();
	});

	adjustVideoAdContainer(params);

	return video;
}

async function loadVideoAd(videoSettings: UapVideoSettings): Promise<PorvataPlayer> {
	const params = videoSettings.getParams();
	const imageContainer: HTMLElement = params.container.querySelector('div:last-of-type');
	const size: VideoSize = getVideoSize(params.container, params, videoSettings);

	params.vastTargeting = {};
	params.width = size.width;
	params.height = size.height;
	videoSettings.updateParams(params);

	function recalculateVideoSize(video): () => void {
		return () => {
			const currentSize = getVideoSize(params.container, params, videoSettings);

			console.log('** recalculateVideoSize', { currentSize, video, params, videoSettings });

			video.resize(currentSize.width, currentSize.height);
		};
	}

	const video: PorvataPlayer = await loadPorvata(videoSettings, params.container, imageContainer);

	// window.addEventListener('resize', throttle(recalculateVideoSize(video), 250));
	new DomListener().resize$.subscribe(() => {
		console.log('** resize');
		recalculateVideoSize(video)();
	});

	if (params.videoTriggerElement) {
		params.videoTriggerElement.addEventListener('click', () => video.play());
	} else if (params.videoTriggers) {
		params.videoTriggers.forEach((trigger) => {
			trigger.addEventListener('click', () => video.play());
		});
	}

	return video;
}

function getUapId(): string {
	return uapId;
}

function getCreativeId(): string {
	return uapCreativeId;
}

function setIds(lineItemId, creativeId): void {
	uapId = lineItemId || constants.DEFAULT_UAP_ID;
	uapCreativeId = creativeId || constants.DEFAULT_UAP_ID;

	updateSlotsTargeting(uapId, uapCreativeId);
}

function getType(): string {
	return uapType;
}

function setType(type): void {
	uapType = type;
}

function updateSlotsTargeting(lineItemId, creativeId): void {
	const slots = context.get('slots') || {};

	Object.keys(slots).forEach((slotId) => {
		if (!slots[slotId].nonUapSlot) {
			context.set(`slots.${slotId}.targeting.uap`, lineItemId);
			context.set(`slots.${slotId}.targeting.uap_c`, creativeId);
		}
	});
}

function enableSlots(slotsToEnable): void {
	if (getType() !== 'abcd') {
		slotsToEnable.forEach((slotName) => {
			btfBlockerService.unblock(slotName);
		});
	}
}

function disableSlots(slotsToDisable): void {
	slotsToDisable.forEach((slotName) => {
		slotService.disable(slotName);
	});
}

function initSlot(params: UapParams): void {
	const adSlot: AdSlot = slotService.get(params.slotName);

	params.container = adSlot.getElement();

	if (params.isDarkTheme) {
		params.container.classList.add('is-dark');
	}
	if (params.isMobile) {
		params.container.classList.add('is-mobile-layout');
	}
	if (utils.client.isSmartphone() || utils.client.isTablet()) {
		params.container.classList.add('is-mobile-device');
	}
}

function reset(): void {
	setType(constants.DEFAULT_UAP_TYPE);
	setIds(constants.DEFAULT_UAP_ID, constants.DEFAULT_UAP_ID);
}

function isFanTakeoverLoaded(): boolean {
	return (
		getUapId() !== constants.DEFAULT_UAP_ID &&
		constants.FAN_TAKEOVER_TYPES.indexOf(getType()) !== -1
	);
}

export function registerUapListener(): void {
	eventService.communicator.actions$
		.pipe(
			ofType(adSlotEvent),
			filter((action) => {
				return [AdSlot.TEMPLATES_LOADED, AdSlot.STATUS_COLLAPSE, AdSlot.STATUS_FORCED_COLLAPSE]
					.map((status) => action.event === status)
					.some((x) => !!x);
			}),
			take(1),
		)
		.subscribe(() => {
			eventService.communicator.dispatch(
				uapLoadStatus({ isLoaded: universalAdPackage.isFanTakeoverLoaded() }),
			);
		});
}

// Side effect
registerUapListener();

export const universalAdPackage = {
	...constants,
	init(params: UapParams, slotsToEnable: string[] = [], slotsToDisable: string[] = []): void {
		let adProduct = 'uap';

		if (this.isVideoEnabled(params)) {
			adProduct = 'vuap';
		}

		params.adProduct = params.adProduct || adProduct;

		setIds(params.uap, params.creativeId);
		disableSlots(slotsToDisable);
		enableSlots(slotsToEnable);
		setType(params.adProduct);

		if (params.slotName) {
			initSlot(params);
		}
	},
	initSlot,
	isFanTakeoverLoaded,
	getCreativeId,
	getType,
	getUapId,
	isVideoEnabled(params) {
		const triggersArrayIsNotEmpty =
			Array.isArray(params.videoTriggers) && params.videoTriggers.length > 0;

		return !!params.videoAspectRatio && (params.videoPlaceholderElement || triggersArrayIsNotEmpty);
	},
	loadVideoAd,
	reset,
	setType,
	uapLoadStatus,
};
