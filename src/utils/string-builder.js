import Context from '../services/context-service';

export default class {
	static build(string, parameters = {}) {
		const matches = string.match(/{(.+?)}/g);

		if (matches) {
			matches.forEach((match) => {
				let name, index;
				const key = match.replace('{', '').replace('}', ''),
				      value = Context.get(key),
					keyArray = key.split('.');

				if (parameters[key]) {
					string = string.replace(match, parameters[key]);
				} else if (keyArray[1] && keyArray[1] >= 0) {
					name = keyArray[0];
					index = keyArray[1];
					string = string.replace(match, parameters[name][index]);
				} else if (value !== undefined) {
					string = string.replace(match, value);
				}
			});
		}

		return string;
	}
}
