import { AdSlot } from '@wikia/ad-engine';

export interface TrackingData {
	[key: string]: string | number;
}
export type TrackingMiddleware = (data: TrackingData, slot: AdSlot) => TrackingData;

export {}; // tslint no-sole-types fix
