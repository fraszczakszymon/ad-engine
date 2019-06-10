import { AdSlot } from '@wikia/ad-engine';

export interface TrackingData {
	[key: string]: string | number;
}
export type TrackingCallback = (data: TrackingData, slot: AdSlot) => any;
export type TrackingMiddleware = (next) => TrackingCallback;

export {}; // tslint no-sole-types fix
