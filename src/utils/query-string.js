export default {
	get: (key) => {
		const queryParameters = {},
			queryString = window.location.search.substr(1).split('&');

		if (queryString === '') {
			return null;
		}

		queryString.forEach((pair) => {
			const [id, value] = pair.split('=');
			if (value) {
				queryParameters[id] = decodeURIComponent(value.replace(/\+/g, ' '));
			}
		});

		return queryParameters[key];
	}
};
