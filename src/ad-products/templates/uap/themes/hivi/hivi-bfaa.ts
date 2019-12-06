import { AdSlot, context, slotTweaker } from '@ad-engine/core';
import * as EventEmitter from 'eventemitter3';
import { mapValues } from 'lodash';
import { FSM, ReduxExtensionConnector, State } from 'state-charts';
import { BigFancyAdAboveConfig, PorvataPlayer, resolvedState } from '../../../..';
import { AdvertisementLabel } from '../../../interface/advertisement-label';
import { CSS_CLASSNAME_THEME_RESOLVED } from '../../constants';
import { UapVideoSettings } from '../../uap-video-settings';
import { UapParams, UapState } from '../../universal-ad-package';
import { BigFancyAdTheme } from '../theme';

const STATES = {
	IMPACT: 'impact',
	INITIAL: 'initial',
	RESOLVED: 'resolved',
	STICKY: 'stickY',
};
const ACTIONS = {
	IMPACT: 'impact',
	RESOLVE: 'resolve',
	RESET: 'reset',
	UNSTICK: 'unstick',
	CLOSE: 'close-click',
	STICK: 'stick',
};

const bfaaStates = [
	{
		name: STATES.INITIAL,
		transitions: [
			{ action: ACTIONS.IMPACT, to: STATES.IMPACT },
			{ action: ACTIONS.RESOLVE, to: STATES.RESOLVED },
		],
	},
	{
		name: STATES.RESOLVED,
		transitions: [
			{ action: ACTIONS.STICK, to: STATES.STICKY },
			{ action: ACTIONS.RESET, to: STATES.IMPACT },
		],
	},
	{
		name: STATES.STICKY,
		transitions: [
			{ action: ACTIONS.UNSTICK, to: STATES.RESOLVED },
			{ action: ACTIONS.CLOSE, to: STATES.RESOLVED },
		],
	},
	{
		name: STATES.IMPACT,
		transitions: [
			{ action: ACTIONS.STICK, to: STATES.STICKY },
			{ action: ACTIONS.RESOLVE, to: STATES.RESOLVED },
		],
	},
];
const bfaaEmitter = new EventEmitter();

const bfaaFsm = new FSM(
	bfaaEmitter,
	bfaaStates,
	bfaaStates.find((state) => state.name === 'initial'),
);
/* tslint:disable */
new ReduxExtensionConnector(bfaaFsm, '[UAP BFAA] ');
bfaaFsm.init();

export class BfaaHiviTheme extends BigFancyAdTheme {
	protected config: BigFancyAdAboveConfig;
	video: PorvataPlayer;

	constructor(protected adSlot: AdSlot, public params: UapParams) {
		super(adSlot, params);
		this.config = context.get('templates.bfaa') || {};

		bfaaEmitter.on(FSM.events.enter, (event: State) => {
			if (event.name === STATES.RESOLVED) {
				slotTweaker.makeResponsive(this.adSlot, this.params.config.aspectRatio.resolved);
				this.switchImagesInAd(true);
				this.container.classList.add(CSS_CLASSNAME_THEME_RESOLVED);

				this.updateAdSizes();
			}
			if (event.name === STATES.IMPACT) {
				slotTweaker.makeResponsive(this.adSlot, this.params.config.aspectRatio.default);
				this.switchImagesInAd(false);
				this.container.classList.remove(CSS_CLASSNAME_THEME_RESOLVED);

				this.updateAdSizes();
			}
		});
	}

	// This is run first
	adIsReady(videoSettings: UapVideoSettings): Promise<HTMLIFrameElement | HTMLElement> {
		resolvedState.isResolvedState(this.params)
			? bfaaFsm.dispatch(ACTIONS.RESOLVE)
			: bfaaFsm.dispatch(ACTIONS.IMPACT);

		return Promise.resolve(this.adSlot.getIframe());
	}

	// This is run next
	onAdReady(): void {
		this.container.classList.add('theme-hivi');
		this.addAdvertisementLabel();
	}

	addAdvertisementLabel(): void {
		const advertisementLabel = new AdvertisementLabel();

		this.container.appendChild(advertisementLabel.render());
	}

	onVideoReady(video: PorvataPlayer): void {
		this.video = video;
	}

	private switchImagesInAd(isResolved: boolean): void {
		if (this.params.image2 && this.params.image2.background) {
			if (isResolved) {
				this.params.image2.element.classList.remove('hidden-state');
				this.params.image1.element.classList.add('hidden-state');
			} else {
				this.params.image2.element.classList.add('hidden-state');
				this.params.image1.element.classList.remove('hidden-state');
			}
		} else {
			this.params.image1.element.classList.remove('hidden-state');
		}
	}

	private updateAdSizes(): Promise<HTMLElement> {
		const { aspectRatio, state } = this.params.config;
		const currentWidth: number = this.config.mainContainer.offsetWidth;
		const maxHeight = currentWidth / aspectRatio.default;
		const minHeight = currentWidth / aspectRatio.resolved;
		const scrollY = window.scrollY || window.pageYOffset || 0;
		const aspectScroll =
			bfaaFsm.state.name === STATES.IMPACT ? Math.max(minHeight, maxHeight - scrollY) : minHeight;
		const currentAspectRatio = currentWidth / aspectScroll;
		const aspectRatioDiff = aspectRatio.default - aspectRatio.resolved;
		const currentDiff = aspectRatio.default - currentAspectRatio;
		const currentState = 1 - (aspectRatioDiff - currentDiff) / aspectRatioDiff;
		const heightDiff = state.height.default - state.height.resolved;
		const heightFactor = (state.height.default - heightDiff * currentState) / 100;
		const relativeHeight = aspectScroll * heightFactor;

		this.updateVideoSize(relativeHeight);

		const style = mapValues(this.params.config.state, (styleProperty: UapState<number>) => {
			const diff: number = styleProperty.default - styleProperty.resolved;

			return `${styleProperty.default - diff * currentState}%`;
		});

		if (this.params.thumbnail) {
			this.setThumbnailStyle(style);
			if (this.video) {
				this.setVideoStyle(style);
			}
		}

		return slotTweaker.makeResponsive(this.adSlot, currentAspectRatio);
	}

	private setThumbnailStyle(style): void {
		Object.assign(this.params.thumbnail.style, style);
	}

	private setVideoStyle(style) {
		Object.assign(this.video.container.style, style);

		if (this.video.isFullscreen()) {
			this.video.container.style.height = '100%';
		}
	}

	private updateVideoSize(relativeHeight: number): void {
		if (this.video && !this.video.isFullscreen()) {
			this.video.container.style.width = `${this.params.videoAspectRatio * relativeHeight}px`;
		}
	}
}
