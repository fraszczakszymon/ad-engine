export class IframeBuilder {
	create(adSlot) {
		const doc = adSlot.getElement();
		const iframe = doc.appendChild(document.createElement('iframe'));

		iframe.frameBorder = 0;
		iframe.onload = () => this.removeBodyMargin(iframe);

		return iframe;
	}

	/** @private */
	removeBodyMargin(iframe) {
		const { body } = iframe.contentDocument;

		body.style.margin = 0;
	}
}
