import { queryString } from './query-string';

const debugGroup = queryString.get('adengine_debug') || '';
const groups = debugGroup.split(',');

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
