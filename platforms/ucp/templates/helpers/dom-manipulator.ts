import { forIn } from 'lodash';

// TODO: move to ad-engine core

class ElementManipulator {
	private stylesBackup: Partial<CSSStyleDeclaration> = {};
	private classesBackup?: string;

	constructor(private element: HTMLElement) {}

	setProperty<T extends keyof CSSStyleDeclaration>(name: T, value: CSSStyleDeclaration[T]): this {
		this.saveProperty(name);
		this.element.style[name] = value;

		return this;
	}

	private saveProperty<T extends keyof CSSStyleDeclaration>(name: T): void {
		if (this.stylesBackup[name] !== undefined) {
			return;
		}

		this.stylesBackup[name] = this.element.style[name];
	}

	addClass(...tokens: string[]): this {
		this.saveClasses();
		this.element.classList.add(...tokens);

		return this;
	}

	removeClass(...tokens: string[]): this {
		this.saveClasses();
		this.element.classList.remove(...tokens);

		return this;
	}

	private saveClasses(): void {
		if (this.classesBackup) {
			return;
		}

		this.classesBackup = this.element.classList.value;
	}

	restore(): void {
		forIn(this.stylesBackup, (value, key) => {
			this.element.style[key] = value;
		});

		if (this.classesBackup) {
			this.element.classList.value = this.classesBackup;
		}

		this.stylesBackup = {};
		this.classesBackup = undefined;
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
