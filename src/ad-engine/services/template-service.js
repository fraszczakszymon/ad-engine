import { logger } from '../utils/logger';
import { context } from './context-service';

const logGroup = 'template-service',
	templates = {};

class TemplateService {
	register(template, customConfig = null) {
		if (typeof template.getName !== 'function') {
			throw new Error('Template does not implement getName method.');
		}
		const name = template.getName();

		let config = {};

		if (typeof template.getDefaultConfig === 'function') {
			config = template.getDefaultConfig();
		}

		if (customConfig) {
			config = Object.assign(config, customConfig);
		}

		context.set(`templates.${name}`, config);
		templates[name] = template;
	}

	init(name, slot = null, params = {}) {
		logger(logGroup, 'Load template', name, slot, params);

		if (!templates[name]) {
			throw new Error(`Template ${name} does not exist.`);
		}

		return new templates[name](slot).init(params);
	}

	applyTemplates(adSlot) {
		const stickyAdTemplateName = 'stickyAd';
		const stickyLines = context.get(`templates.${stickyAdTemplateName}Lines`);

		if (
			stickyLines && stickyLines.length && adSlot.lineItemId &&
			(stickyLines.indexOf(adSlot.lineItemId.toString()) !== -1 || stickyLines.indexOf(adSlot.lineItemId) !== -1)
		) {
			adSlot.setConfigProperty('defaultTemplate', stickyAdTemplateName);
		}
	}
}

export const templateService = new TemplateService();
