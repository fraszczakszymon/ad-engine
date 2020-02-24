import { Injectable } from '@wikia/dependency-injection';
import { animationFrameScheduler, fromEvent, Observable } from 'rxjs';
import { observeOn, publish, refCount } from 'rxjs/operators';

@Injectable()
export class RxjsDomListener {
	readonly scroll$: Observable<Event> = this.createSource('scroll');
	readonly resize$: Observable<Event> = this.createSource('resize');

	private createSource(eventName: string): Observable<Event> {
		return fromEvent(document, eventName).pipe(
			observeOn(animationFrameScheduler), // scheduler to ensure smooth animation
			publish(), // so that only one listener is created
			refCount(), // so that listener is deleted when no subscriptions
		);
	}
}
