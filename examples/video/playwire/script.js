'use strict';

import Context from 'ad-engine/services/context-service';
import Playwire from 'ad-engine/video/playwire';

const configUrl = Playwire.getConfigUrl(1004220, 4843893),
	container = document.getElementById('player');

Context.set('vast.adUnitId', '/5441/adengine/{src}/{slotName}');
Context.set('targeting.artid', 217);
Context.set('targeting.s1', '_project43');

var params = {
	configUrl: configUrl,
	container: container,
	width: 640,
	height: 480,
	slotName: 'TEST_SLOT'
};

Playwire.inject(params);
