import { context } from '../services';

class StringBuilder {
	build(string, parameters = {}) {
		const matches = string.match(/{(.+?)}/g);

		if (matches) {
			matches.forEach((match) => {
				const key = match.replace('{', '').replace('}', ''),
					fallbackValue = context.get(key),
					keySegments = key.split('.');

				let index,
					segment,
					value = parameters[keySegments[0]];

				if (value) {
					for (index = 1; index < keySegments.length; index += 1) {
						segment = keySegments[index];
						if (typeof value[segment] === 'undefined') {
							value = null;
							break;
						}
						value = value[segment];
					}
				}

				let finalValue = value || fallbackValue;
				if (typeof finalValue === 'function') {
					finalValue = finalValue();
				}
				if (typeof finalValue !== 'undefined') {
					string = string.replace(match, finalValue);
				}
			});
		}

		return string;
	}
}

export const stringBuilder = new StringBuilder();
