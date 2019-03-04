import { AdSlot } from '@wikia/ad-engine';

export interface Provider {
	fillIn(adSlot: AdSlot): void;
}
