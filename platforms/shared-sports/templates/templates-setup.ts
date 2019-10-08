import { TemplateSetup } from '@platforms/shared';
import { BigFancyAdAbove, BigFancyAdBelow, templateService } from '@wikia/ad-engine';
import { Injectable } from '@wikia/dependency-injection';
import { getBfaaConfig } from './big-fancy-ad-above-config';
import { getBfabConfig } from './big-fancy-ad-below-config';

@Injectable()
export class SportsTemplateSetup implements TemplateSetup {
	registerTemplates(): void {
		templateService.register(BigFancyAdAbove, getBfaaConfig());
		templateService.register(BigFancyAdBelow, getBfabConfig());
	}
}
