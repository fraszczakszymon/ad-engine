/* global googletag, Krux */

'use strict';

export default class GptTargeting {
	static setup(data) {
		const tag = googletag.pubads();

		if (data.adsPageType === 'home') {
			tag.setTargeting('vertical', 'home');
		} else if (data.adsPageType === 'hub') {
			tag.setTargeting('hub', data.verticals[0]);
		} else if (data.verticals && data.verticals.length) {
			tag.setTargeting('vertical', data.verticals);
		}

		if (data.id) {
			tag.setTargeting('post_id', data.id.toString())
				.setTargeting('page_url', window.location.toString());
		}

		if (data.topics && data.topics.length) {
			tag.setTargeting('topic', data.topics);
		}

		if (data.tags && data.tags.length) {
			tag.setTargeting('tags', data.tags);
		}

		if (data.categories && data.categories.length) {
			tag.setTargeting('categories', data.categories);
		}

		if (window.Krux && Krux.segments && Krux.user) {
			tag.setTargeting('ksg', Krux.segments);
			tag.setTargeting('kuid', Krux.user);
		}

		tag.setTargeting('skin', 'fandom_' + (window.upstream.isMobileScreenSize ? 'mobile' : 'desktop'));
		tag.setTargeting('host', window.location.hostname);
	}

	static setTargeting(key, value) {
		const tag = googletag.pubads();

		tag.setTargeting(key, value);
	}
}
