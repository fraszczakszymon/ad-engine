import { AdSlot, context, scrollListener, slotTweaker } from '@ad-engine/core';
import * as EventEmitter from 'eventemitter3';
import { mapValues } from 'lodash';
import { fromEvent } from 'rxjs';
import { skip } from 'rxjs/operators';
import { FSM, ReduxExtensionConnector, State } from 'state-charts';
import { BigFancyAdAboveConfig, PorvataPlayer, resolvedState, UapRatio } from '../../../..';
import { AdvertisementLabel } from '../../../interface/advertisement-label';
import { CSS_CLASSNAME_THEME_RESOLVED } from '../../constants';
import { UapVideoSettings } from '../../uap-video-settings';
import { UapParams, UapState } from '../../universal-ad-package';
import { BigFancyAdTheme } from '../theme';

const HIVI_RESOLVED_THRESHOLD = 0.995;

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
			{ action: ACTIONS.IMPACT, to: STATES.IMPACT },
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
	stopNextVideo = false;
	impactUIScrollListener: string;
	impactStateScrollListener: string;

	constructor(protected adSlot: AdSlot, public params: UapParams) {
		super(adSlot, params);
		this.config = context.get('templates.bfaa') || {};

		bfaaEmitter.on(FSM.events.enter, (state: State) => {
			if (state.name === STATES.RESOLVED) {
				slotTweaker.makeResponsive(this.adSlot, this.params.config.aspectRatio.resolved);
				this.switchImagesInAd(true);
				this.container.classList.add(CSS_CLASSNAME_THEME_RESOLVED);

				this.updateAdSizes();
			}

			if (state.name === STATES.IMPACT) {
				slotTweaker.makeResponsive(this.adSlot, this.params.config.aspectRatio.default);
				this.switchImagesInAd(false);
				this.container.classList.remove(CSS_CLASSNAME_THEME_RESOLVED);

				this.updateAdSizes();

				this.impactUIScrollListener = scrollListener.addCallback(() => {
					this.updateAdSizes();
				});
			}
		});

		bfaaEmitter.on(FSM.events.enter, (state: State) => {
			if (state.name === STATES.IMPACT) {
				this.impactStateScrollListener = scrollListener.addCallback(() => {
					if (this.currentState >= HIVI_RESOLVED_THRESHOLD) {
						bfaaFsm.dispatch(ACTIONS.RESOLVE);
					}
				});
			}
		});

		bfaaEmitter.on(FSM.events.leave, (state: State) => {
			if (state.name === STATES.IMPACT) {
				scrollListener.removeCallback(this.impactUIScrollListener);
			}
		});

		bfaaEmitter.on(FSM.events.leave, (state: State) => {
			if (state.name === STATES.IMPACT) {
				scrollListener.removeCallback(this.impactStateScrollListener);
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

		// Video restart
		fromEvent(video.ima, 'wikiaAdPlayTriggered')
			.pipe(skip(1))
			.subscribe(() => {
				bfaaFsm.dispatch(ACTIONS.IMPACT);
			});
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

	get currentWidth(): number {
		return this.config.mainContainer.offsetWidth;
	}

	get aspectRatio(): UapRatio {
		return this.params.config.aspectRatio;
	}

	get currentAspectRatio(): number {
		return this.currentWidth / this.aspectScroll;
	}

	get aspectScroll(): number {
		const maxHeight = this.currentWidth / this.aspectRatio.default;
		const minHeight = this.currentWidth / this.aspectRatio.resolved;
		const scrollY = window.scrollY || window.pageYOffset || 0;

		return bfaaFsm.state.name === STATES.IMPACT
			? Math.max(minHeight, maxHeight - scrollY)
			: minHeight;
	}

	get currentState(): number {
		const { aspectRatio } = this.params.config;
		const aspectRatioDiff = aspectRatio.default - aspectRatio.resolved;
		const currentDiff = aspectRatio.default - this.currentAspectRatio;
		return 1 - (aspectRatioDiff - currentDiff) / aspectRatioDiff;
	}

	private updateAdSizes(): Promise<HTMLElement> {
		const { state } = this.params.config;
		const currentState = this.currentState;
		const heightDiff = state.height.default - state.height.resolved;
		const heightFactor = (state.height.default - heightDiff * currentState) / 100;
		const relativeHeight = this.aspectScroll * heightFactor;

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

		return slotTweaker.makeResponsive(this.adSlot, this.currentAspectRatio);
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
