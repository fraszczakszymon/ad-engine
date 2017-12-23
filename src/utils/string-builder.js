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
						if (!value[segment]) {
							value = null;
							break;
						}
						value = value[segment];
					}
				}

				if (value || fallbackValue) {
					string = string.replace(match, value || fallbackValue);
				}
			});
		}

		return string;
	}
}

export const stringBuilder = new StringBuilder();
