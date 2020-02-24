import { Injectable } from '@wikia/dependency-injection';
import { animationFrameScheduler, fromEvent, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class RxjsDomListener {
	readonly scroll$: Observable<Event> = this.createSource('scroll');
	readonly resize$: Observable<Event> = this.createSource('resize');

	private createSource(eventName: string): Observable<Event> {
		return fromEvent(document, eventName).pipe(
			shareReplay({ bufferSize: 1, refCount: true, scheduler: animationFrameScheduler }),
		);
	}
}
