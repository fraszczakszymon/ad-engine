import { utils } from '@wikia/ad-engine';
import { BaseAdapter } from './base-adapter';

export class Wikia extends BaseAdapter {
	constructor(options) {
		super(options);

		this.bidderName = 'wikia';
		this.enabled = !!(utils.queryString.get('wikia_adapter'));
		this.useRandomPrice = utils.queryString.get('wikia_adapter_random') === '1';
		this.timeout = parseInt(utils.queryString.get('wikia_adapter_timeout'), 10) || 0;
		this.limit = parseInt(utils.queryString.get('wikia_adapter_limit'), 10) || 99;

		this.create = () => this;
	}

	prepareConfigForAdUnit(code, { sizes }) {
		return {
			code,
			mediaTypes: {
				banner: {
					sizes
				}
			},
			bids: [
				{
					bidder: this.bidderName
				}
			]
		};
	}

	getSpec() {
		return {
			code: this.bidderName,
			supportedMediaTypes: ['banner']
		};
	}

	getPrice() {
		const price = utils.queryString.get('wikia_adapter');

		if (this.useRandomPrice) {
			return Math.floor(Math.random() * 2000) / 100;
		}

		return parseInt(price, 10) / 100;
	}

	callBids(bidRequest, addBidResponse, done) {
		window.pbjs.que.push(() => {
			this.addBids(bidRequest, addBidResponse, done);
		});
	}

	addBids(bidRequest, addBidResponse, done) {
		setTimeout(() => {
			bidRequest.bids.forEach((bid) => {
				if (this.limit === 0) {
					return;
				}

				const bidResponse = window.pbjs.createBid(1);
				const [width, height] = bid.sizes[0];
				const cpm = this.getPrice();

				bidResponse.ad = this.getCreative(bid.sizes[0], cpm);
				bidResponse.bidderCode = bidRequest.bidderCode;
				bidResponse.cpm = cpm;
				bidResponse.ttl = 300;
				bidResponse.mediaType = 'banner';
				bidResponse.width = width;
				bidResponse.height = height;

				addBidResponse(bid.adUnitCode, bidResponse);
				this.limit -= 1;
			});
			done();
		}, this.timeout);
	}

	getCreative(size, cpm) {
		const creative = document.createElement('div');

		creative.style.background = '#00b7e0';
		creative.style.color = '#fff';
		creative.style.fontFamily = 'sans-serif';
		creative.style.height = '100%';
		creative.style.textAlign = 'center';
		creative.style.width = '100%';

		const title = document.createElement('p');

		title.innerText = 'Wikia Creative';
		title.style.fontWeight = 'bold';
		title.style.margin = '0';
		title.style.paddingTop = '10px';

		const details = document.createElement('small');

		details.innerText = `cpm: ${cpm}, size: ${size.join('x')}`;

		creative.appendChild(title);
		creative.appendChild(details);

		return creative.outerHTML;
	}
}
