import {
	AdEngineRunnerSetup,
	CommonAdEngineRunnerSetup,
	CommonContextSetup,
	CommonStateSetup,
	ContextSetup,
	StateSetup,
	WikiContextSetup,
} from '@platforms/shared';
import { context, InstantConfigService } from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';

import * as fallbackInstantConfig from './fallback-config.json';

import { UcpWikiContextSetup } from './setup/context/wiki/ucp-wiki-context.setup';

export async function setupUcpIoc(): Promise<Container> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(WikiContextSetup).to(UcpWikiContextSetup);
	container.bind(AdEngineRunnerSetup).to(CommonAdEngineRunnerSetup);
	container.bind(ContextSetup).to(CommonContextSetup);
	container.bind(StateSetup).to(CommonStateSetup);

	return container;
}
