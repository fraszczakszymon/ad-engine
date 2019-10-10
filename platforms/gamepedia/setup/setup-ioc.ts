import {
	AdsMode,
	BiddersConfigSetup,
	BiddersStateSetup,
	CommonBiddersStateSetup,
	CommonContextSetup,
	CommonStateSetup,
	ContextSetup,
	CurseSlotsContextSetup,
	CurseSlotsStateSetup,
	CurseUapSetup,
	DelayModulesSetup,
	LabradorTracker,
	NoAdsMode,
	SlotsContextSetup,
	SlotsStateSetup,
	StateSetup,
	TargetingSetup,
	TemplateSetup,
	UapSetup,
	WikiContextSetup,
} from '@platforms/shared';
import { context, InstantConfigService } from '@wikia/ad-engine';
import { Container } from '@wikia/dependency-injection';
import { set } from 'lodash';
import * as fallbackInstantConfig from '../fallback-config.json';
import { GamepediaNoAdsMode } from '../modes/gamepedia-no-ads.mode';
import { GamepediaAdsMode } from '../modes/gampedia-ads.mode';
import { GamepediaTemplateSetup } from '../templates/templates-setup';
import { GamepediaLabradorTracker } from '../tracking/labrador-tracker';
import { GamepediaBiddersConfigSetup } from './context/bidders/gamepedia-bidders-config.setup';
import { GamepediaTargetingSetup } from './context/targeting/gamepedia-targeting.setup';
import { GamepediaWikiContextSetup } from './context/wiki/gamepedia-wiki-context.setup';
import { GamepediaDelayModulesSetup } from './delay-modules-setup';

export async function setupIoc(): Promise<Container> {
	const container = new Container();

	set(window, context.get('services.instantConfig.fallbackConfigKey'), fallbackInstantConfig);
	container.bind(InstantConfigService as any).value(await InstantConfigService.init());
	container.bind(WikiContextSetup).to(GamepediaWikiContextSetup);
	container.bind(TargetingSetup).to(GamepediaTargetingSetup);
	container.bind(BiddersConfigSetup).to(GamepediaBiddersConfigSetup);
	container.bind(TemplateSetup).to(GamepediaTemplateSetup);
	container.bind(DelayModulesSetup).to(GamepediaDelayModulesSetup);
	container.bind(NoAdsMode).to(GamepediaNoAdsMode);
	container.bind(AdsMode).to(GamepediaAdsMode);
	container.bind(LabradorTracker).to(GamepediaLabradorTracker);
	container.bind(ContextSetup).to(CommonContextSetup);
	container.bind(SlotsContextSetup).to(CurseSlotsContextSetup);
	container.bind(StateSetup).to(CommonStateSetup);
	container.bind(BiddersStateSetup).to(CommonBiddersStateSetup);
	container.bind(SlotsStateSetup).to(CurseSlotsStateSetup);
	container.bind(UapSetup).to(CurseUapSetup);

	return container;
}
