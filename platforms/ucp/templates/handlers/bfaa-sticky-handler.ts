import {
	AdSlot,
	DomManipulator,
	NAVBAR,
	RxjsDomListener,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
	universalAdPackage,
	utils,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { from, Observable, Subject } from 'rxjs';
import { mergeMap, startWith, take, takeUntil, tap } from 'rxjs/operators';
import { isUndefined } from 'util';
import { BfaaHelper } from '../helpers/bfaa-helper';

@Injectable()
export class BfaaStickyHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();
	private manipulator = new DomManipulator();
	private helper: BfaaHelper;

	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(NAVBAR) navbar: HTMLElement,
		private domListener: RxjsDomListener,
	) {
		this.helper = new BfaaHelper(this.manipulator, this.params, this.adSlot, navbar);
	}

	async onEnter(transition: TemplateTransition<'transition'>): Promise<void> {
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

		this.viewedAndDelayed()
			.pipe(
				takeUntil(this.unsubscribe$),
				mergeMap(() => this.domListener.scroll$.pipe(take(1))),
				tap(() => transition('transition')),
			)
			.subscribe();
	}

	private viewedAndDelayed(): Observable<unknown> {
		const slotViewed: Promise<void> = this.adSlot.loaded.then(() => this.adSlot.viewed);
		const videoViewed: Promise<void> = this.params.stickyUntilVideoViewed
			? utils.once(this.adSlot, AdSlot.VIDEO_VIEWED_EVENT)
			: Promise.resolve();
		const unstickDelay: number = isUndefined(this.params.stickyAdditionalTime)
			? universalAdPackage.BFAA_UNSTICK_DELAY
			: this.params.stickyAdditionalTime;

		return from(Promise.all([slotViewed, videoViewed, utils.wait(unstickDelay)]));
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
