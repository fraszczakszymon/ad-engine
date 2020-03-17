import {
	AdSlot,
	DomListener,
	DomManipulator,
	NAVBAR,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { BfaaHelper } from '../../helpers/bfaa-helper';

@Injectable()
export class BfaaResolvedHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();
	private manipulator = new DomManipulator();
	private helper: BfaaHelper;

	constructor(
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(NAVBAR) navbar: HTMLElement,
		private domListener: DomListener,
	) {
		this.helper = new BfaaHelper(this.manipulator, this.params, this.adSlot, navbar);
	}

	async onEnter(transition: TemplateTransition<'resolved'>): Promise<void> {
		this.adSlot.show();
		this.helper.setResolvedImage();
		this.domListener.resize$
			.pipe(
				startWith({}),
				tap(() => {
					this.helper.setResolvedAdHeight();
				}),
				takeUntil(this.unsubscribe$),
			)
			.subscribe();
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
