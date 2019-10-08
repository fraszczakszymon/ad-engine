import { babDetection, trackBab } from '@platforms/shared';
import { AdEngine, btRec, context, utils } from '@wikia/ad-engine';

const GPT_LIBRARY_URL = '//www.googletagservices.com/tag/js/gpt.js';

export function startAdEngine(): void {
	utils.scriptLoader.loadScript(GPT_LIBRARY_URL);

	const engine = new AdEngine();

	engine.init();

	if (babDetection.isEnabled()) {
		babDetection.run().then((isBabDetected) => {
			trackBab(isBabDetected);

			if (isBabDetected) {
				btRec.run();
			}
		});
	}

	context.push('listeners.slot', {
		onRenderEnded: (slot) => {
			slot.getElement().classList.remove('default-height');
		},
	});

	// TODO: SportsAdStackSetup
	context.push('state.adStack', { id: 'cdm-zone-01' });
	context.push('state.adStack', { id: 'cdm-zone-02' });
	context.push('state.adStack', { id: 'cdm-zone-03' });
	context.push('state.adStack', { id: 'cdm-zone-06' });
	context.push('events.pushOnScroll.ids', 'cdm-zone-04');
}
