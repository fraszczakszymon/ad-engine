class QueryString {
	static getValues(input = null) {
		const path = input || window.location.search.substr(1),
			queryParameters = {},
			queryString = path.split('&');

		if (queryString === '') {
			return null;
		}

		queryString.forEach((pair) => {
			const [id, value] = pair.split('=');
			if (value) {
				queryParameters[id] = decodeURIComponent(value.replace(/\+/g, ' '));
			}
		});

		return queryParameters;
	}

	static get(key) {
		const queryParameters = QueryString.getValues();

		return queryParameters[key];
	}
}

export const __useDefault = true;
export default QueryString;
