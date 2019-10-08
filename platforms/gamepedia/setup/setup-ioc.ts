import {
	BiddersConfigSetup,
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
import { GamepediaWikiContextSetup } from './wiki-context-setup';

export async function setupIoc(): Promise<Container> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(WikiContextSetup).to(GamepediaWikiContextSetup);
	container.bind(TargetingSetup).to(GamepediaTargetingSetup);
	container.bind(BiddersConfigSetup).to(GamepediaBiddersConfigSetup);
	container.bind(TemplateRegistry).to(GamepediaTemplateRegistry);

	return container;
}
