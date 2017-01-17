export default {
	createScript(src, type, isAsync, node) {
		const script = document.createElement('script');

		node = node || document.body.lastChild;
		script.async = isAsync || true;
		script.type = type || 'text/javascript';
		script.src = src;
		node.parentNode.insertBefore(script, node);

		return script;
	},

	loadAsync(src, node, type) {
		return this.loadScript(src, type, true, node);
	},

	loadScript(src, type, isAsync, node) {
		let self = this;
		return new Promise((resolve, reject) => {
			const script = self.createScript(src, type, isAsync, node);

			script.onload = resolve;
			script.onerror = reject;
		});
	}
};
