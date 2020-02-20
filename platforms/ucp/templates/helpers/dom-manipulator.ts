import { forIn } from 'lodash';

// TODO: move to ad-engine core

class ElementManipulator {
	private backup: Partial<CSSStyleDeclaration> = {};

	constructor(private element: HTMLElement) {}

	setProperty<T extends keyof CSSStyleDeclaration>(name: T, value: CSSStyleDeclaration[T]): this {
		this.saveProperty(name);
		this.element.style[name] = value;

		return this;
	}

	private saveProperty<T extends keyof CSSStyleDeclaration>(name: T): void {
		if (this.backup[name] !== undefined) {
			return;
		}

		this.backup[name] = this.element.style[name];
	}

	restore(): void {
		forIn(this.backup, (value, key) => {
			this.element.style[key] = value;
		});

		this.backup = {};
	}
}

export class DomManipulator {
	private elements = new Map<HTMLElement, ElementManipulator>();

	element(element: HTMLElement): ElementManipulator {
		if (!this.elements.has(element)) {
			this.elements.set(element, new ElementManipulator(element));
		}

		return this.elements.get(element);
	}

	restore(): void {
		this.elements.forEach((element) => element.restore());
		this.elements.clear();
	}
}
