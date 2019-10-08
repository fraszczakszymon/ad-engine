import {
	BiddersConfigSetup,
	DelayModulesSetup,
	TargetingSetup,
	TemplateRegistry,
} from '@platforms/shared';
import { context, InstantConfigService } from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';
import { SportsBiddersConfigSetup } from '../bidders/bidders-config-setup';
import * as fallbackInstantConfig from '../fallback-config.json';
import { SportsTargetingSetup } from '../targeting';
import { SportsTemplateRegistry } from '../templates/templates-registry';
import { SportsDelayModulesSetup } from './delay-modules-setup';

export async function setupIoc(): Promise<Container> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(TargetingSetup).to(SportsTargetingSetup);
	container.bind(BiddersConfigSetup).to(SportsBiddersConfigSetup);
	container.bind(TemplateRegistry).to(SportsTemplateRegistry);
	container.bind(DelayModulesSetup).to(SportsDelayModulesSetup);

	return container;
}
