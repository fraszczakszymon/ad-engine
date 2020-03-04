import {
	AdSlot,
	DomManipulator,
	FOOTER,
	NAVBAR,
	Porvata4Player,
	RxjsDomListener,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { from, fromEvent, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BfaaHelper } from '../helpers/bfaa-helper';
import { BfaaVideoHelper } from '../helpers/bfaa-video-helper';
import { BfaaContext } from './bfaa-context';

@Injectable()
export class BfaaImpactHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();
	private manipulator = new DomManipulator();
	private helper: BfaaHelper;
	private videoHelper: BfaaVideoHelper;

	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.CONTEXT) private context: BfaaContext,
		@Inject(FOOTER) private footer: HTMLElement,
		@Inject(NAVBAR) navbar: HTMLElement,
		private domListener: RxjsDomListener,
	) {
		this.helper = new BfaaHelper(this.manipulator, this.params, this.adSlot, navbar);
		this.videoHelper = new BfaaVideoHelper(this.manipulator, this.params, this.adSlot);
	}

	async onEnter(transition: TemplateTransition<'sticky' | 'resolved'>): Promise<void> {
		let video$: Observable<Porvata4Player>;

		if (this.context.video) {
			video$ = from(this.context.video);
		}

		this.adSlot.show();
		this.helper.setImpactImage();
		this.domListener.resize$
			.pipe(
				takeUntil(this.unsubscribe$),
				startWith({}),
				tap(() => {
					this.helper.setImpactAdHeight();
					this.helper.setAdFixedPosition();
					this.helper.setNavbarFixedPosition();
					this.helper.setBodyPadding();
				}),
			)
			.subscribe();

		const scroll$ = this.domListener.scroll$.pipe(takeUntil(this.unsubscribe$));

		scroll$
			.pipe(
				tap(() => {
					this.helper.setImpactAdHeight();
					this.helper.setAdFixedPosition();
					this.helper.setNavbarFixedPosition();
				}),
				filter(() => this.reachedResolvedSize()),
				tap(() => {
					const correction = this.helper.usePositionCorrection(this.footer);

					transition('sticky').then(correction);
				}),
			)
			.subscribe();

		if (video$) {
			video$
				.pipe(
					takeUntil(this.unsubscribe$),
					tap((video) => this.videoHelper.setVideoImpactSize(video)),
					switchMap((video) => scroll$.pipe(tap(() => this.videoHelper.setVideoImpactSize(video)))),
				)
				.subscribe();
			video$
				.pipe(
					takeUntil(this.unsubscribe$),
					switchMap((video) => fromEvent(video, 'wikiaAdCompleted')),
					tap(() => transition('resolved')),
				)
				.subscribe();
		}
	}

	private reachedResolvedSize(): boolean {
		return this.helper.getImpactAdHeight() <= this.helper.getResolvedAdHeight();
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
