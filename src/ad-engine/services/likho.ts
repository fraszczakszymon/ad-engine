import { context } from './context-service';

export interface LikhoStorageElement {
	likhoType: string;
	expirationTime: number;
}

export class LikhoService {
	static TIME_TO_EXPIRE = 24 * 3600 * 1000;

	refresh(): LikhoStorageElement[] {
		let likhoStorage: LikhoStorageElement[] = this.retrieve();

		likhoStorage = likhoStorage.filter((item) => item.expirationTime > Date.now());

		return this.save(likhoStorage);
	}

	update(likhoType: string, timeToExpire = LikhoService.TIME_TO_EXPIRE): LikhoStorageElement[] {
		const after24hTime: number = Date.now() + timeToExpire;
		const likhoStorage: LikhoStorageElement[] = this.retrieve();
		const likhoTypeStoredElement: LikhoStorageElement = likhoStorage.find(
			(element: LikhoStorageElement) => element.likhoType === likhoType,
		);

		if (!!likhoTypeStoredElement) {
			likhoTypeStoredElement.expirationTime = after24hTime;
		} else {
			likhoStorage.push({
				likhoType,
				expirationTime: after24hTime,
			});
		}

		return this.save(likhoStorage);
	}

	private save(likhoStorage: LikhoStorageElement[]): LikhoStorageElement[] {
		localStorage.setItem('likho', JSON.stringify(likhoStorage));
		context.set('targeting.likho', likhoStorage.map((item: LikhoStorageElement) => item.likhoType));

		return likhoStorage;
	}

	private retrieve(): LikhoStorageElement[] {
		return JSON.parse(localStorage.getItem('likho')) || [];
	}
}

export const likhoService = new LikhoService();
