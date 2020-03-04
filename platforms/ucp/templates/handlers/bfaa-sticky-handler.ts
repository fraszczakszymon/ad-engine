import {
	AdSlot,
	DomManipulator,
	NAVBAR,
	Porvata4Player,
	RxjsDomListener,
	TEMPLATE,
	TemplateStateHandler,
	UapParams,
	universalAdPackage,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { from, fromEvent, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BfaaHelper } from '../helpers/bfaa-helper';
import { BfaaVideoHelper } from '../helpers/bfaa-video-helper';
import { BfaaContext } from './bfaa-context';

@Injectable()
export class BfaaStickyHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();
	private manipulator = new DomManipulator();
	private helper: BfaaHelper;
	private videoHelper: BfaaVideoHelper;

	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.CONTEXT) private context: BfaaContext,
		@Inject(NAVBAR) navbar: HTMLElement,
		private domListener: RxjsDomListener,
	) {
		this.helper = new BfaaHelper(this.manipulator, this.params, this.adSlot, navbar);
		this.videoHelper = new BfaaVideoHelper(this.manipulator, this.params, this.adSlot);
	}

	async onEnter(): Promise<void> {
		let video$: Observable<Porvata4Player>;

		if (this.context.video) {
			video$ = from(this.context.video);
		}
		this.adSlot.show();
		this.helper.setResolvedImage();
		this.domListener.resize$
			.pipe(
				takeUntil(this.unsubscribe$),
				startWith({}),
				tap(() => {
					this.helper.setResolvedAdHeight();
					this.helper.setAdFixedPosition();
					this.helper.setNavbarFixedPosition();
					this.helper.setBodyPadding();
				}),
			)
			.subscribe();
		if (video$) {
			video$
				.pipe(
					takeUntil(this.unsubscribe$),
					take(1),
					tap((video) => this.videoHelper.setVideoResolvedSize(video)),
				)
				.subscribe();

			if (video$) {
				video$
					.pipe(
						switchMap((video) => {
							return fromEvent(this.adSlot, AdSlot.CUSTOM_EVENT).pipe(
								filter((event: { status: string }) => {
									return event.status === universalAdPackage.SLOT_FORCE_UNSTICK;
								}),
								tap(() => video.stop()),
							);
						}),
						takeUntil(this.unsubscribe$),
					)
					.subscribe();
			}
		}
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this.manipulator.restore();
	}
}
