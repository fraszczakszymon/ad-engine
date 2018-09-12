import { get, set } from 'lodash';
import * as utils from './utils';

const versionField = 'ads.adEngineVersion';

if (get(window, versionField, null)) {
	window.console.warn('Multiple <?= PACKAGE(name) ?> initializations. This may cause issues.');
}

set(window, versionField, 'v<?= PACKAGE(version) ?>');
utils.logger('ad-engine', 'v<?= PACKAGE(version) ?>');

export * from './ad-engine';
export * from './listeners/index';
export * from './models/index';
export * from './providers/index';
export * from './services/index';
export * from './video/index';
export { utils };
