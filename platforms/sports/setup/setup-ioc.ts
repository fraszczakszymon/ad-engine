import {
	AdEnginePreStarter,
	AdStackSetup,
	BiddersConfigSetup,
	DelayModulesSetup,
	TargetingSetup,
	TemplateSetup,
} from '@platforms/shared';
import { context, InstantConfigService } from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';
import { SportsBiddersConfigSetup } from '../bidders/bidders-config-setup';
import * as fallbackInstantConfig from '../fallback-config.json';
import { SportsTemplateSetup } from '../templates/templates-setup';
import { SportsAdEnginePreStarter } from './ad-engine-prestarter';
import { SportsAdStackSetup } from './ad-stack-setup';
import { SportsDelayModulesSetup } from './delay-modules-setup';
import { SportsTargetingSetup } from './targeting-setup';

export async function setupIoc(): Promise<Container> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(TargetingSetup).to(SportsTargetingSetup);
	container.bind(BiddersConfigSetup).to(SportsBiddersConfigSetup);
	container.bind(TemplateSetup).to(SportsTemplateSetup);
	container.bind(DelayModulesSetup).to(SportsDelayModulesSetup);
	container.bind(AdStackSetup).to(SportsAdStackSetup);
	container.bind(AdEnginePreStarter).to(SportsAdEnginePreStarter);

	return container;
}
