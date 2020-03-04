import {
	AdSlot,
	DomManipulator,
	TEMPLATE,
	TemplateStateHandler,
	TemplateTransition,
	UapParams,
} from '@wikia/ad-engine';
import { Inject, Injectable } from '@wikia/dependency-injection';
import { Subject } from 'rxjs';
import { BfaaVideoHelper } from '../helpers/bfaa-video-helper';
import { BfaaContext } from './bfaa-context';

@Injectable()
export class BfaaTransitionVideoHandler implements TemplateStateHandler {
	private unsubscribe$ = new Subject<void>();
	private manipulator = new DomManipulator();
	private helper: BfaaVideoHelper;

	constructor(
		@Inject(TEMPLATE.PARAMS) private params: UapParams,
		@Inject(TEMPLATE.SLOT) private adSlot: AdSlot,
		@Inject(TEMPLATE.CONTEXT) private context: BfaaContext,
	) {
		this.helper = new BfaaVideoHelper(this.manipulator, this.params, this.adSlot);
	}

	async onEnter(transition: TemplateTransition<'transition'>): Promise<void> {
		console.error(this.context);
		console.error(this.helper);
	}

	async onLeave(): Promise<void> {
		this.unsubscribe$.next();
		this.manipulator.restore();
	}
}
