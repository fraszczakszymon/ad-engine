'use strict';

export function get(key) {
	const queryParameters = {},
		queryString = window.location.search.substr(1).split('&');

	if (queryString === '') {
		return null;
	}

	queryString.forEach((pair) => {
		const [key, value] = pair.split('=');
		if (!!value) {
			queryParameters[key] = decodeURIComponent(value.replace(/\+/g, ' '));
		}
	});

	return queryParameters[key];
}
