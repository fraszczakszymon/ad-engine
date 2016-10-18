import Context from '../services/context-service';

export default class {
	static build(string, parameters = {}) {
		const matches = string.match(/{(.+?)}/g);

		if (matches) {
			matches.forEach((match) => {
				const key = match.replace('{', '').replace('}', ''),
					value = Context.get(key);

				if (parameters[key]) {
					string = string.replace(match, parameters[key]);
				} else if (value !== undefined) {
					string = string.replace(match, value);
				}
			});
		}

		return string;
	}
}
