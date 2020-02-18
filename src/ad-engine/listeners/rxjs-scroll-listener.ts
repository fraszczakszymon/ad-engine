import { Injectable } from '@wikia/dependency-injection';
import { animationFrameScheduler, fromEvent, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class RxjsScrollListener {
	readonly scroll$: Observable<Event> = this.createSource();

	private createSource(): Observable<Event> {
		return fromEvent(document, 'scroll').pipe(
			shareReplay({ bufferSize: 1, refCount: true, scheduler: animationFrameScheduler }),
		);
	}
}
