// TODO: Think of a better place for this class
export class IframeBuilder {
	create(adSlot) {
		const doc = adSlot.getElement();

		return doc.appendChild(this.createEmptyIframe());
	}

	/**
	 * @private
	 * Inspired by `createInvisibleIframe` method from Prebid.js
	 */
	createEmptyIframe() {
		const f = document.createElement('iframe');

		f.height = 0;
		f.width = 0;
		f.border = '0px';
		f.hspace = '0';
		f.vspace = '0';
		f.marginWidth = '0';
		f.marginHeight = '0';
		f.style.border = '0';
		f.scrolling = 'no';
		f.frameBorder = '0';
		f.src = 'about:blank';
		f.style.display = 'inline';
		f.style.overflow = 'hidden';

		return f;
	}
}
