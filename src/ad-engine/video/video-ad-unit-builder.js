import { context } from '../services';
import { stringBuilder } from '../utils';

export function getVideoAdUnit(slotName) {
	return stringBuilder.build(context.get(`slots.${slotName}.vast.adUnitId`) || context.get('vast.adUnitId'), {
		slotConfig: context.get(`slots.${slotName}`)
	});
}
