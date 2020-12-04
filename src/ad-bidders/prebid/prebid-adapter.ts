import { Aliases, context, Dictionary } from '@ad-engine/core';
// tslint:disable-next-line:no-blacklisted-paths
import { permutive } from '@ad-engine/services';
import { isArray } from 'util';
import { PrebidAdapterConfig, PrebidAdSlotConfig } from './prebid-models';

export const DEFAULT_MAX_CPM = 20;
export const EXTENDED_MAX_CPM = 50;

export abstract class PrebidAdapter {
	static bidderName: string;
	aliases?: Aliases;
	isCustomBidAdapter = false;
	maxCpm = DEFAULT_MAX_CPM;

	enabled: boolean;
	slots: any;
	pageTargeting: Dictionary;

	constructor({ enabled, slots }: PrebidAdapterConfig) {
		this.enabled = enabled;
		this.slots = slots;
		this.pageTargeting = {
			...(context.get('targeting') || {}),
		};

		Object.keys(this.pageTargeting).forEach((key) => {
			if (!isArray(this.pageTargeting[key])) {
				this.pageTargeting[key] = [this.pageTargeting[key]];
			}
		});
	}

	abstract prepareConfigForAdUnit(code: string, config: PrebidAdSlotConfig): PrebidAdUnit;

	abstract get bidderName(): string;

	prepareAdUnits(): PrebidAdUnit[] {
		return Object.keys(this.slots).map((slotName) =>
			this.prepareConfigForAdUnit(slotName, this.slots[slotName]),
		);
	}

	protected getTargeting(slotName, customTargeting = {}): Dictionary {
		return {
			...this.pageTargeting,
			p_standard: permutive.getPermutiveKeys(),
			src: [context.get('src') || ''],
			pos: [slotName],
			...customTargeting,
		};
	}
}
