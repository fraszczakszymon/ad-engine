import { utils } from '@ad-engine/core';
import { resolvedStateSwitch } from './resolved-state-switch';

function getQueryParam(): string {
	return utils.queryString.get('resolved_state');
}

function isForcedByURLParam(): boolean {
	return [true, 'true', '1'].indexOf(getQueryParam()) > -1;
}

function isBlockedByURLParam(): boolean {
	return [false, 'blocked', 'false', '0'].indexOf(getQueryParam()) > -1;
}
function templateSupportsResolvedState(params): boolean {
	return !!(params.image1 && params.image1.resolvedStateSrc) || params.theme === 'hivi';
}

function isResolvedState(params): boolean {
	let result = false;

	if (params.resolvedStateForced) {
		return true;
	}

	if (templateSupportsResolvedState(params)) {
		const showResolvedState = !isBlockedByURLParam();
		let defaultStateSeen = true;

		if (showResolvedState) {
			defaultStateSeen = resolvedStateSwitch.wasDefaultStateSeen() || isForcedByURLParam();
		}

		result = showResolvedState && defaultStateSeen;
	}

	return result;
}

export const resolvedState = {
	isResolvedState,
	updateInformationAboutSeenDefaultStateAd: () => {
		resolvedStateSwitch.updateInformationAboutSeenDefaultStateAd();
	},
};
