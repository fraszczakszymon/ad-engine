import path from 'path';
import CDP from 'chrome-remote-interface';

class EavesDropService {
	async beforeSession(config) {
		this.seleniumHost = config.host;
	}

	async before() {
		this.port = await this.getPort();
	}

	async getPort() {
		await browser.url('chrome://version');
		const cmdLineElemText = await browser.getText('#command_line');
		let port = parseInt(
			cmdLineElemText.match(/--remote-debugging-port=(\d*)/)[1],
			10,
		);
		if (port === 0) {
			/**
			 * newer Chrome versions store port in DevToolsActivePort file
			 */
			const userDataDir = cmdLineElemText
				.match(/--user-data-dir=([^-]*)/)[1]
				.trim();
			await browser.url(
				`file:///${path.join(userDataDir, 'DevToolsActivePort')}`,
			);
			const response = await browser.getText('<pre>');
			port = parseInt(response.split('\n').shift(), 10);
		}
		return port;
	}

	async getClient() {
		let client;
		try {
			client = await CDP({
				port: this.port,
				host: this.seleniumHost,
			});
			await client.Network.enable();
			console.log(
				`Successfully enabled Chrome Network debugging on port ${this.port}`,
			);
		} catch (e) {
			console.warn(
				`Could not initialise Chrome Developer Tools Protocol\n${e}`,
			);
		}
		return client;
	}

	async closeClient(client) {
		if (client) {
			await client.close();
		}
	}
}

module.exports = new EavesDropService();
