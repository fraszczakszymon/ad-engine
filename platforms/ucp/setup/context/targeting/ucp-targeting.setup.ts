import { TargetingSetup } from '@platforms/shared';
import { context, Targeting, utils } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';

@Injectable()
export class UcpTargetingSetup implements TargetingSetup {
	configureTargetingContext(): void {
		context.set('targeting', this.getPageLevelTargeting({}));
	}

	private getPageLevelTargeting(): Partial<Targeting> {
		const cid = utils.queryString.get('cid');
		const targeting: Partial<Targeting> = {
			skin: 'ucp',
			uap: 'none',
			uap_c: 'none',
			s0: 'ucp',
			s1: 'ucp',
			dmn: 'domain',
		};

		if (cid !== undefined) {
			targeting.cid = cid;
		}

		return targeting;
	}
}
