import Context from '../services/context-service';

export default class {
	static build(string, parameters = {}) {
		const matches = string.match(/{(.+?)}/g);

		if (matches) {
			matches.forEach((match) => {
				let key = match.replace('{', '').replace('}', '');
				const value = Context.get(key),
					keyArray = key.split('.');

				if (parameters[key]) {
					string = string.replace(match, parameters[key]);
				} else if (keyArray[1] && keyArray[1] >= 0) {
					string = string.replace(match, parameters[keyArray[0]][keyArray[1]]);
				} else if (value !== undefined) {
					string = string.replace(match, value);
				}
			});
		}

		return string;
	}
}
