import {
	AdSlot,
	DomManipulator,
	NAVBAR,
	Porvata4Player,
	RxjsDomListener,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { from, Observable, Subject } from 'rxjs';
import { startWith, take, takeUntil, tap } from 'rxjs/operators';
import { BfaaHelper } from '../helpers/bfaa-helper';
import { BfaaVideoHelper } from '../helpers/bfaa-video-helper';
import { BfaaContext } from './bfaa-context';

@Injectable()
export class BfaaResolvedHandler implements TemplateStateHandler {
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

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
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
		}
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
