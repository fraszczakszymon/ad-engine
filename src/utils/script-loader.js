class ScriptLoader {
	createScript(src, type = 'text/javascript', isAsync = true, node = null) {
		const script = document.createElement('script');

		node = node || document.body.lastChild;
		script.async = isAsync;
		script.type = type;
		script.src = src;
		node.parentNode.insertBefore(script, node);

		return script;
	}

	loadScript(src, type = 'text/javascript', isAsync = true, node = null) {
		return new Promise((resolve, reject) => {
			const script = this.createScript(src, type, isAsync, node);

			script.onload = resolve;
			script.onerror = reject;
		});
	}
}

export const scriptLoader = new ScriptLoader();
