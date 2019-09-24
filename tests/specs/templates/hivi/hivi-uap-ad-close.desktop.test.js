import { expect } from 'chai';
import { hiviUap } from '../../../pages/hivi-uap-ad.page';
import { adSlots } from '../../../common/ad-slots';
import { timeouts } from '../../../common/timeouts';
import { network } from '../../../common/network';

// TODO fix network capture
describe('Desktop HiVi UAP ads page: top leaderboard', () => {
	before(() => {
		network.enableLogCapturing();
		network.captureConsole();
	});

	after(() => {
		network.disableLogCapturing();
	});

	// TODO fix network capture
	it('resolved: should log message to console that force-close event was triggered by TLB', () => {
		const message = 'Custom listener: onCustomEvent top_leaderboard force-close';

		hiviUap.openUapWithState(true, hiviUap.pageLink, adSlots.topLeaderboard);
		browser.pause(5000);
		let logs = network.returnConsole();

		logs.forEach((log) => {
			console.log(log);
			console.log(log.text.includes('👁 Custom listener: onImpressionViewable top_leaderboard'));
		});
	});

	// TODO fix network capture
	it.skip('unresolved: should log message to console that force-close event was triggered by TLB', () => {
		const message = 'Custom listener: onCustomEvent top_leaderboard force-close';

		hiviUap.openUapWithState(false, hiviUap.pageLink, adSlots.topLeaderboard);
		$('.button-unstick').waitForDisplayed(timeouts.standard);

		$('.button-unstick').click();
		browser.waitUntil(
			() => networkCapture.logsIncludesMessage(message, logs, 'log', true),
			2000,
			`Logs should contain message: "${message}".\nLogs are: ${JSON.stringify(logs)}`,
		);

		expect(networkCapture.logsIncludesMessage('force-unstick', logs, 'any', true)).to.be.false;
	});
});
