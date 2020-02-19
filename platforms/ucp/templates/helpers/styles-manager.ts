import { forIn } from 'lodash';

// TODO: better names

class ElementManager {
	private backup: Partial<CSSStyleDeclaration> = {};

	constructor(private element: HTMLElement) {}

	property<T extends keyof CSSStyleDeclaration>(name: T, value: CSSStyleDeclaration[T]): this {
		this.save(name);

		this.element.style[name] = value;

		return this;
	}

	private save<T extends keyof CSSStyleDeclaration>(name: T): void {
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

export class StylesManager {
	private elements = new Map<HTMLElement, ElementManager>();

	element(element: HTMLElement): ElementManager {
		if (!this.elements.has(element)) {
			this.elements.set(element, new ElementManager(element));
		}

		return this.elements.get(element);
	}

	restore(): void {
		this.elements.forEach((element) => element.restore());
		this.elements.clear();
	}
}
