import { expect } from 'chai';
import { stickyAd } from '../../../pages/sticky-ad.page';
import { adSlots } from '../../../common/ad-slots';
import { timeouts } from '../../../common/timeouts';
import { helpers } from '../../../common/helpers';
import networkCapture from '../../../common/network-capture';

describe('sticky-ad template', () => {
	let client;
	const logs = [];

	before(async () => {
		client = await networkCapture.getClient();

		client.on('Log.entryAdded', (entry) => {
			logs.push(entry.entry);
		});

		client.on('Console.messageAdded', (entry) => {
			logs.push(entry.message);
		});
	});

	beforeEach(async () => {
		logs.length = 0;
		await networkCapture.clearConsoleMessages(client);

		browser.url(stickyAd.pageLink);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
	});

	afterEach(() => {
		browser.scroll(0, 0);
	});

	after(async () => {
		await networkCapture.closeClient(client);
	});

	it('should stick and unstick', () => {
		browser.waitForExist(stickyAd.stickedSlot, timeouts.standard, true);
		helpers.slowScroll(500);
		browser.waitForExist(stickyAd.stickedSlot, timeouts.standard);

		helpers.waitForViewabillityCounted(timeouts.unstickTime);
		helpers.slowScroll(1000);
		browser.waitForExist(stickyAd.stickedSlot, timeouts.standard, true);

		expect(networkCapture.logsIncludesMessage('force-unstick', logs, 'any', true)).to.be.false;
		expect(networkCapture.logsIncludesMessage('force-close', logs, 'any', true)).to.be.false;
	});

	it('should not stick if viewability is counted', () => {
		helpers.waitForViewabillityCounted(timeouts.unstickTime);
		helpers.slowScroll(500);
		browser.waitForExist(stickyAd.stickedSlot, timeouts.standard, true);

		expect(networkCapture.logsIncludesMessage('force-unstick', logs, 'any', true)).to.be.false;
		expect(networkCapture.logsIncludesMessage('force-close', logs, 'any', true)).to.be.false;
	});

	it('should unstick if close button is clicked', () => {
		const message = 'Custom listener: onCustomEvent top_leaderboard force-unstick';

		helpers.slowScroll(200);
		browser.waitForExist(stickyAd.stickedSlot, timeouts.standard);
		browser.click(`${stickyAd.stickedSlot} ${stickyAd.classUnstickButton}`);
		browser.waitForExist(stickyAd.stickedSlot, timeouts.standard, true);

		browser.waitUntil(
			() => networkCapture.logsIncludesMessage(message, logs, 'log', true),
			2000,
			`Logs should contain message: "${message}".\nLogs are: ${JSON.stringify(logs)}`,
		);
		expect(networkCapture.logsIncludesMessage('force-close', logs, 'any', true)).to.be.false;
	});

	it('should emit "stickiness-disabled event" if stickiness is disabled', () => {
		const message = '👁 Custom listener: onCustomEvent top_leaderboard stickiness-disabled';

		browser.url(`${stickyAd.pageLink}?disabled=1`);
		browser.waitForVisible(adSlots.topLeaderboard, timeouts.standard);
		helpers.slowScroll(200);

		browser.waitUntil(
			() => networkCapture.logsIncludesMessage(message, logs, 'log', true),
			2000,
			`Logs should contain message: "${message}".\nLogs are: ${JSON.stringify(logs)}`,
		);
	});
});
