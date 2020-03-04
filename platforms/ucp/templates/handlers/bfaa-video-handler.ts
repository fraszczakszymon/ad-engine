import {
	AdSlot,
	Porvata,
	Porvata4Player,
	resolvedState,
	TEMPLATE,
	TemplateStateHandler,
	UapParams,
	universalAdPackage,
	videoUIElements,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { BfaaContext } from './bfaa-context';

@Injectable()
export class BfaaVideoHandler implements TemplateStateHandler {
	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.CONTEXT) private context: BfaaContext,
	) {}

	async onEnter(): Promise<void> {
		this.adSlot.addClass('theme-hivi'); // Required by replay-overlay
		const params = { ...this.params };

		params.vastTargeting = { passback: universalAdPackage.getType() };

		const isResolvedState = !resolvedState.isResolvedState(this.params);
		const defaultStateAutoPlay = params.autoPlay && !isResolvedState;
		const resolvedStateAutoPlay = params.resolvedStateAutoPlay && isResolvedState;

		params.autoPlay = Boolean(defaultStateAutoPlay || resolvedStateAutoPlay);

		const playerContainer = Porvata.createVideoContainer(this.adSlot.getElement());

		let videoLoaded: (player: Porvata4Player) => void;

		this.context.video = new Promise<Porvata4Player>((res) => {
			videoLoaded = res;
		});

		Porvata.inject({ ...params, container: playerContainer }).then((video) => {
			videoLoaded(video);

			video.addEventListener('adCanPlay', () => {
				video.dom.getVideoContainer().classList.remove('hide');
			});
			video.addEventListener('wikiaAdStarted', () => {
				if (!video.isFullscreen()) {
					// TODO: Split setting height to default and impact
					const slotHeight = this.adSlot.getElement().offsetHeight;
					const margin = (slotHeight * (100 - params.config.state.height.default)) / 2 / 100;
					const height = slotHeight * 0.92; // TODO: from 92% in impact to 100% in resolved
					const width = height * params.videoAspectRatio;

					video.resize(width, height); // TODO: sync size of video, player container and thumbnail

					playerContainer.parentElement.style.width = `${width}px`;
					playerContainer.parentElement.style.height = `${height}px`;
					playerContainer.parentElement.style.top = `${margin}px`;
				}

				video.addEventListener('wikiaAdCompleted', () => {
					video.reload();
				});
			});
			// TODO: split to bfaa-resolved-video-handler and bfaa-impact-video-handler

			// videoUIElements.ProgressBar.add(video, video.dom.getInterfaceContainer()); // TODO: Add ProgressBar
			// createBottomPanel({ fullscreenAllowed: params.fullscreenAllowed, theme: 'hivi' });  // TODO: Add createBottomPanel
			// videoUIElements.ToggleUI.add(video, interfaceContainer, params);  // TODO: Add ToggleUI
			// videoUIElements.LearnMore.add(video, playerContainer, params); // TODO: Add LearnMore
			videoUIElements.ToggleVideo.add(video, playerContainer.parentElement);
			videoUIElements.ToggleThumbnail.add(video, undefined, params);
			videoUIElements.ReplayOverlay.add(video, video.dom.getPlayerContainer(), params);
		});
	}

	async onLeave(): Promise<void> {}
}

// TODO: test with slower network conn
