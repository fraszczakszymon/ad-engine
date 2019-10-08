import { AdEnginePreStarter, biddersDelay } from '@platforms/shared';
import { bidders, confiant, durationMedia, taxonomyService } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { hideAllAdSlots } from '../templates/hide-all-ad-slots';
import { editModeManager } from '../utils/edit-mode-manager';

@Injectable()
export class GamepediaAdEnginePreStarter implements AdEnginePreStarter {
	runPreStartActions(): void {
		editModeManager.onActivate(() => hideAllAdSlots());
		this.callExternals();
	}

	private callExternals(): void {
		bidders.requestBids({
			responseListener: biddersDelay.markAsReady,
		});

		confiant.call();
		durationMedia.call();

		taxonomyService.configurePageLevelTargeting();
	}
}
