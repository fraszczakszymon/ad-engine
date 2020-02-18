import { Injectable } from '@wikia/dependency-injection';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class RxjsScrollListener {
	readonly scroll$: Observable<Event> = this.createSource();

	private createSource(): Observable<Event> {
		const source$: Observable<Event> = new Observable((observer) => {
			let ticking = false;
			const listener = (event: Event) => {
				if (!ticking) {
					window.requestAnimationFrame(() => {
						ticking = false;
						observer.next(event);
					});
					ticking = true;
				}
			};

			document.addEventListener('scroll', listener);

			return () => document.removeEventListener('scroll', listener);
		});

		return source$.pipe(shareReplay({ bufferSize: 1, refCount: true }));
	}
}
