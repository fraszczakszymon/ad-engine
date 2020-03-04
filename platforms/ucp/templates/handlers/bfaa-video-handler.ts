import {
	AdSlot,
	createBottomPanel,
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
			window['video'] = video;
			videoLoaded(video);

			video.addEventListener('adCanPlay', () => {
				video.dom.getVideoContainer().classList.remove('hide');
			});
			video.addEventListener('wikiaAdStarted', () => {
				video.addEventListener('wikiaAdCompleted', () => {
					video.reload();
				});
			});
			videoUIElements.ProgressBar.add(video, video.dom.getInterfaceContainer());
			createBottomPanel({ fullscreenAllowed: params.fullscreenAllowed, theme: 'hivi' }).add(
				video,
				video.dom.getInterfaceContainer(),
				params,
			);
			videoUIElements.ToggleUI.add(video, video.dom.getInterfaceContainer(), params);
			videoUIElements.ToggleVideo.add(video, playerContainer.parentElement);
			videoUIElements.ToggleThumbnail.add(video, undefined, params);
			videoUIElements.ReplayOverlay.add(video, video.dom.getPlayerContainer(), params);
		});
	}

	async onLeave(): Promise<void> {}
}

// TODO: test with slower network conn
