import { VastParams, vastParser } from './vast-parser';

function setAttribute(element: HTMLElement, attribute?: string, value?: string): void {
	if (!element || !value) {
		return;
	}

	element.setAttribute(attribute, value);
}

class VastDebugger {
	setVastAttributesFromVastParams(
		element: HTMLElement,
		status: string,
		vastParams: VastParams,
	): void {
		setAttribute(element, 'data-vast-content-type', vastParams.contentType);
		setAttribute(element, 'data-vast-creative-id', vastParams.creativeId);
		setAttribute(element, 'data-vast-line-item-id', vastParams.lineItemId);
		setAttribute(element, 'data-vast-position', vastParams.position);
		setAttribute(element, 'data-vast-size', vastParams.size);
		setAttribute(element, 'data-vast-status', status);
		setAttribute(element, 'data-vast-params', JSON.stringify(vastParams.customParams));
	}

	setVastAttributes(
		element: HTMLElement,
		vastUrl: string,
		status: string,
		imaAd?: google.ima.Ad,
	): void {
		const vastParams: VastParams = vastParser.parse(vastUrl, { imaAd });

		this.setVastAttributesFromVastParams(element, status, vastParams);
	}
}

export const vastDebugger = new VastDebugger();
