import {
	AdSlot,
	context,
	FuncPipeline,
	FuncPipelineStep,
	slotService,
	utils,
} from '@ad-engine/core';

interface ClickPayload {
	x: number;
	y: number;
	elementWidth: number;
	elementHeight: number;
	frameType: string;
	source: string;
}

export interface ClickPositionContext {
	category: string;
	action: string;
	label: string;
}

class ClickPositionTracker {
	private pipeline = new FuncPipeline<ClickPositionContext>();
	private logGroup = 'click-position-tracker';

	register(middleware: FuncPipelineStep<ClickPositionContext>, slotName: string): void {
		if (!this.isEnabled(slotName)) {
			return;
		}

		slotService.on(slotName, AdSlot.SLOT_RENDERED_EVENT, () => {
			this.addClickTrackingListeners(middleware, slotName);
		});
	}

	private isEnabled(slotName: string): boolean {
		return context.get(`slots.${slotName}.clickPositionTracking`);
	}

	private addClickTrackingListeners(
		middleware: FuncPipelineStep<ClickPositionContext>,
		slotName: string,
	): void {
		const slot: AdSlot = slotService.get(slotName);
		const iframeElement: HTMLIFrameElement = slot.getIframe();
		const slotElement: HTMLElement = slot.getElement();
		const elementHeight: number = slotElement.offsetHeight;
		const elementWidth: number = slotElement.offsetWidth;

		if (!slot || !iframeElement) {
			utils.logger(this.logGroup, `Slot ${slotName} has no iframe.`);
			return;
		}

		if (!typeof iframeElement.contentWindow) {
			utils.logger(this.logGroup, `Slot ${slotName} is served in safeframe.`);
			return;
		}
		const iframeBody: HTMLElement = iframeElement.contentWindow.document.body;
		const frameType = slot.getFrameType();

		if (iframeBody && slotElement) {
			slotElement.addEventListener('click', (e: MouseEvent) => {
				const y: number = e.clientY - window.innerHeight + elementHeight;

				this.handleClickEvent(middleware, {
					elementHeight,
					elementWidth,
					frameType,
					y,
					x: e.clientX,
					source: 'slot',
				});
			});
			iframeBody.addEventListener('click', (e: MouseEvent) => {
				this.handleClickEvent(middleware, {
					elementHeight,
					elementWidth,
					frameType,
					y: e.clientY,
					x: e.clientX,
					source: 'iframe',
				});
			});
		}
	}

	private handleClickEvent(
		middleware: FuncPipelineStep<ClickPositionContext>,
		clickPayload: ClickPayload,
	): void {
		this.pipeline.execute(
			{
				category: 'click_position',
				action: 'click',
				label:
					`size=${clickPayload.elementWidth}x${clickPayload.elementHeight}` +
					`|x=${clickPayload.x}|y=${clickPayload.y}|source=${clickPayload.source}` +
					`|frame=${clickPayload.frameType}`,
			},
			middleware,
		);
	}
}

export const clickPositionTracker = new ClickPositionTracker();
