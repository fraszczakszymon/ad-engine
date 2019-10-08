import {
	AdEnginePreStarter,
	AdStackSetup,
	BiddersConfigSetup,
	DelayModulesSetup,
	NoAdsHandler,
	TargetingSetup,
	TemplateRegistry,
	WikiContextSetup,
} from '@platforms/shared';
import { context, InstantConfigService } from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';
import { GamepediaBiddersConfigSetup } from '../bidders/bidders-config-setup';
import * as fallbackInstantConfig from '../fallback-config.json';
import { GamepediaTargetingSetup } from '../targeting';
import { GamepediaTemplateRegistry } from '../templates/templates-registry';
import { GamepediaAdEnginePreStarter } from './ad-engine-prestarter';
import { GamepediaAdStackSetup } from './ad-stack-setup';
import { GamepediaDelayModulesSetup } from './delay-modules-setup';
import { GamepediaNoAdsHandler } from './no-ads-handler';
import { GamepediaWikiContextSetup } from './wiki-context-setup';

export async function setupIoc(): Promise<Container> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(WikiContextSetup).to(GamepediaWikiContextSetup);
	container.bind(TargetingSetup).to(GamepediaTargetingSetup);
	container.bind(BiddersConfigSetup).to(GamepediaBiddersConfigSetup);
	container.bind(TemplateRegistry).to(GamepediaTemplateRegistry);
	container.bind(DelayModulesSetup).to(GamepediaDelayModulesSetup);
	container.bind(AdStackSetup).to(GamepediaAdStackSetup);
	container.bind(AdEnginePreStarter).to(GamepediaAdEnginePreStarter);
	container.bind(NoAdsHandler).to(GamepediaNoAdsHandler);

	return container;
}
