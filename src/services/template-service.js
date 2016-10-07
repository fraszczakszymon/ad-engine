'use strict';

import {logger} from '../utils/logger';

const logGroup = 'template-service';

let templates = {};

export default class TemplateService {
	static register(name, template) {
		templates[name] = template;
	}

	static init(name, slot, params = {}) {
		logger(logGroup, 'Load template', name, slot, params);
		if (!templates[name]) {
			throw `Template ${name} does not exist.`;
		}

		return new templates[name](slot).init(params);
	}
}
