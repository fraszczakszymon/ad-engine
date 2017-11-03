import Context from '../services/context-service';

export default class {
	static build(string, parameters = {}) {
		const matches = string.match(/{(.+?)}/g);

		if (matches) {
			matches.forEach((match) => {
				let key = match.replace('{', '').replace('}', '');
				const value = Context.get(key);

				if (key.indexOf('.') !== -1) {
					let keyArray = key.split('.');

					if (parseInt(keyArray[1], 10) >= 0) {
						parameters = parameters[keyArray[0]];
						key = keyArray[1];
					}
				}

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
