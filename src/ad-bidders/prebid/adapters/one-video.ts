import { PrebidAdapter } from '../prebid-adapter';

export class OneVideo extends PrebidAdapter {
	static bidderName = 'oneVideo';

	get bidderName(): string {
		return OneVideo.bidderName;
	}

	prepareConfigForAdUnit(code, { pubId }): PrebidAdUnit {
		return {
			code,
			mediaTypes: {
				video: {
					playerSize: [640, 480],
					context: 'instream',
				},
			},
			bids: [
				{
					bidder: this.bidderName,
					params: {
						video: {
							playerWidth: 480,
							playerHeight: 640,
							mimes: ['video/mp4'],
						},
						pubId,
					},
				},
			],
		};
	}
}
