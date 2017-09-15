import { logger } from '../utils/logger';
import Context from './context-service';

const logGroup = 'template-service',
	templates = {};

export default class TemplateService {
	static register(template, customConfig = null) {
		if (typeof template.getName !== 'function') {
			throw new Error('Template does not implement getName method.');
		}
		const name = template.getName();

		if (customConfig) {
			Context.set(`templates.${name}`, customConfig);
		} else if (typeof template.getDefaultConfig === 'function') {
			Context.set(`templates.${name}`, template.getDefaultConfig());
		}

		templates[name] = template;
	}

	static init(name, slot = null, params = {}) {
		logger(logGroup, 'Load template', name, slot, params);
		if (!templates[name]) {
			throw new Error(`Template ${name} does not exist.`);
		}

		return new templates[name](slot).init(params);
	}
}
