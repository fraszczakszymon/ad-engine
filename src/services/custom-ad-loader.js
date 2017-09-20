import SlotService from './slot-service';
import TemplateService from './template-service';

export function registerCustomAdLoader(methodName) {
	window[methodName] = (params) => {
		const slot = SlotService.getBySlotName(params.slotName);

		TemplateService.init(params.type, slot, params);
	};
}
