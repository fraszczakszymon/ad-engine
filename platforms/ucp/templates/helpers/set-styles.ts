import { Dictionary } from '@wikia/ad-engine';
import { forIn } from 'lodash';

export type StylesResult<T extends Dictionary<HTMLElement>> = {
	[key in keyof T]: Partial<CSSStyleDeclaration>
};

export function setStyles<T extends Dictionary<HTMLElement>>(
	elements: T,
	styles: StylesResult<T>,
): StylesResult<T> {
	const archive: any = {};

	forIn(elements, (elementValue, elementKey) => {
		archive[elementKey] = {};

		forIn(styles[elementKey], (styleValue, styleKey) => {
			archive[elementKey][styleKey] = elementValue[styleKey];
			elementValue[styleKey] = styleValue;
		});
	});

	return archive;
}
