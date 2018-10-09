const path = require('path');
const CDP = require('chrome-remote-interface');

class EavesDropService {
	constructor() {
		this.seleniumHost = undefined;
	}

	shouldAttemptRemoteDebugConnection() {
		return browser.desiredCapabilities.browserName === 'chrome';
	}

	async beforeSession(config) {
		this.seleniumHost = config.host;
	}

	async initChromeDevtoolsProtocolAndEnableNetworkDebugging() {
		try {
			await browser.url('chrome://version');
			const cmdLineElemText = await browser.getText('#command_line');
			let port = parseInt(
				cmdLineElemText.match(/--remote-debugging-port=(\d*)/)[1],
				10
			);
			/**
			 * newer Chrome versions store port in DevToolsActivePort file
			 */
			if (port === 0) {
				const userDataDir = cmdLineElemText
					.match(/--user-data-dir=([^-]*)/)[1]
					.trim();
				await browser.url(
					`file:///${path.join(userDataDir, 'DevToolsActivePort')}`
				);
				const response = await browser.getText('<pre>');
				port = parseInt(response.split('\n').shift(), 10);
			}
			this.client = await CDP({
				port,
				host: this.seleniumHost,
			});
			await this.client.Network.enable();
			console.log(
				`Successfully enabled Chrome Network debugging on port ${port}`
			);
		} catch (e) {
			console.warn(
				`Could not initialise Chrome Developer Tools Protocol\n${e}`
			);
		}
	}

	async before() {
		if (this.shouldAttemptRemoteDebugConnection()) {
			await this.initChromeDevtoolsProtocolAndEnableNetworkDebugging();
			if (this.client) {
				global.client = this.client;
			}
		}
	}

	// async after() {
	// 	!!this.client && (await this.client.close());
	// }
}

module.exports = new EavesDropService();
