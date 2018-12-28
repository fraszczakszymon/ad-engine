import { HiviBfaaTheme } from './hivi/hivi-bfaa';
import { HiviBfabTheme } from './hivi/hivi-bfab';
import { BfaaTheme, BfabTheme } from './classic';

export class BigFancyAdThemeFactory {
	makeAboveTheme(adSlot, params) {
		return params.theme === 'hivi'
			? new HiviBfaaTheme(adSlot, params)
			: new BfaaTheme(adSlot, params);
	}

	makeBelowTheme(adSlot, params) {
		return params.theme === 'hivi'
			? new HiviBfabTheme(adSlot, params)
			: new BfabTheme(adSlot, params);
	}
}

export const bfaThemeFactory = new BigFancyAdThemeFactory();
