export interface CommonBidDefinition {
	bidderName: string;
	buyerId?: string;
	price: string;
	responseTimestamp: number;
	slotName: string;
	size: string;
	timeToRespond: number;
}
