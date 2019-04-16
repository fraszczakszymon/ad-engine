import { AdSlot } from '../models/index';

export interface Provider {
	fillIn(adSlot: AdSlot): void;
}

export {}; // tslint no-sole-types fix
