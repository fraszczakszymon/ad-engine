import * as QueryString from './query-string';

const debugGroup = QueryString.get('adengine_debug') || '',
	groups = debugGroup.split(',');

if (debugGroup !== '') {
	window.console.info('AdEngine debug mode - groups:', debugGroup === '1' ? 'all' : groups);
}

export function logger(logGroup, ...logValues) {
	if (debugGroup === '') {
		return;
	}

	if (debugGroup === '1' || groups.indexOf(logGroup) !== -1) {
		window.console.info(logGroup, logValues);
	}
}
