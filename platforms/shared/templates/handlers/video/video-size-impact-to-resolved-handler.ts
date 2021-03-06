import { DomListener, startAndRespondTo, TemplateStateHandler } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { PlayerRegistry } from '../../helpers/player-registry';
import { VideoDomManager } from '../../helpers/video-dom-manager';

@Injectable({ autobind: false })
export class VideoSizeImpactToResolvedHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();

	constructor(
		private playerRegistry: PlayerRegistry,
		private domListener: DomListener,
		private manager: VideoDomManager,
	) {}

	async onEnter(): Promise<void> {
		this.playerRegistry.video$
			.pipe(
				startAndRespondTo(this.domListener.scroll$, this.domListener.resize$),
				tap(({ player }) => this.manager.setVideoSizeImpactToResolved(player)),
				takeUntil(this.unsubscribe$),
			)
			.subscribe();
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
	}
}
