export interface TemplateStateHandler {
	onEnter(): Promise<void>;
	onLeave(): Promise<void>;
}
