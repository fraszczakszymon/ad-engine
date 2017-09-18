/* global Storage */
import { logger } from '../utils/logger';

const logGroup = 'local-cache';

let canUseStorage;

export default class LocalCache {
	static canUseStorage() {
		if (typeof canUseStorage === 'undefined') {
			canUseStorage = false;
			if (window.localStorage) {
				try {
					window.localStorage.setItem('test', '1');
					window.localStorage.removeItem('test');
					canUseStorage = true;
				} catch (e) {
					/* There are two known possibilities here:
					 *
					 * 1) The browser isn't allowing access due to a
					 * privacy setting (which can happen in Safari).
					 *
					 * 2) The allowed disk space for storage is used
					 * up. However, this is more likely to happen in
					 * calls to LocalCache.set().
					 */
					try {
						LocalCache.createPolyfill();
						canUseStorage = true;
					} catch (exception) {
						logger(logGroup, 'Local Storage polyfill error: ', exception);
					}
				}
			}
		}

		return canUseStorage;
	}

	static createPolyfill() {
		logger(logGroup, 'Local Storage polyfill being created');
		Storage.prototype.data = {};

		Storage.prototype.setItem = function setItem(id, val) {
			this.data[id] = String(val);
		};

		Storage.prototype.getItem = function getItem(id) {
			return this.data[id] ? this.data[id] : null;
		};

		Storage.prototype.removeItem = function removeItem(id) {
			delete this.data[id];
		};

		Storage.prototype.clear = function clear() {
			this.data = {};
		};
	}

	static get(key) {
		if (!LocalCache.canUseStorage()) {
			return false;
		}

		let cacheItem = window.localStorage.getItem(key);

		if (cacheItem) {
			// De-serialize
			cacheItem = JSON.parse(cacheItem);

			// Check if item has expired
			if (LocalCache.isExpired(cacheItem)) {
				LocalCache.delete(key);
				return false;
			}

			return cacheItem.data;
		}

		return false;
	}

	static set(key, value, expires = null) {
		if (!LocalCache.canUseStorage() || !LocalCache.isStorable(value)) {
			return false;
		}

		const cacheItem = { data: value };
		const expiresValue = parseInt(expires, 10);

		if (!isNaN(expiresValue)) {
			// Set expiration as a JS timestamp
			cacheItem.expires = (expiresValue * 1000) + Date.now();
		}

		try {
			window.localStorage.setItem(key, JSON.stringify(cacheItem));
		} catch (e) {
			// Local Storage is at capacity
			return false;
		}

		return true;
	}

	static delete(key) {
		if (!LocalCache.canUseStorage()) {
			return;
		}

		window.localStorage.removeItem(key);
	}

	static isStorable(value) {
		if (
			// Functions might be a security risk
			typeof value === 'function' ||
			// NaN
			(typeof value === 'number' && isNaN(value)) ||
			// undefined
			typeof value === 'undefined'
		) {
			return false;
		}

		return true;
	}

	static isExpired(cacheItem) {
		return cacheItem.expires && Date.now() >= parseInt(cacheItem.expires, 10);
	}
}
