import Cookies from 'js-cookie';
import Random from './random';
import { context } from '../services/context-service';

const cacheMarker = '-cached',
	cacheMaxAge = 30 * 60 * 1000,
	earth = 'XX',
	negativePrefix = 'non-',
	precision = 10 ** 6, // precision to 0.00000001 (or 0.000001%) of traffic
	samplingSeparator = '/',
	sessionCookieDefault = 'wikia_session_id';

let cache = {},
	cookieLoaded = false,
	geoData = null,
	sessionId = '';

function hasCache(countryList) {
	return countryList.some(country => country.indexOf(cacheMarker) !== -1);
}

function hasSampling(geo) {
	return value => value.indexOf(negativePrefix) !== 0 && value.indexOf(geo + samplingSeparator) > -1;
}

function getSamplingLimits(value) {
	let [, samplingValue] = value.split(samplingSeparator);

	samplingValue = samplingValue.replace(cacheMarker, '');

	return Math.round(parseFloat(samplingValue) * precision) | 0; // eslint-disable-line no-bitwise
}

function addResultToCache(name, result, samplingLimits, withCookie) {
	const [limitValue] = samplingLimits;

	cache[name] = {
		name,
		group: result ? 'B' : 'A',
		limit: (result ? limitValue : (precision * 100) - limitValue) / precision,
		result,
		withCookie
	};

	if (withCookie) {
		synchronizeCookie();
	}
}

function readSession() {
	let sid = sessionId || context.get('options.session.id');

	if (!sid) {
		const sessionCookieName = context.get('options.session.cookieName') || sessionCookieDefault;

		sid = Cookies.get(sessionCookieName) || 'ae3';
		context.set('options.session.cookieName', sid);
	}

	sessionId = sid;
}

function getCookieDomain() {
	const domain = (window.location.hostname).split('.');

	return domain.length > 1 ? `.${domain[domain.length - 2]}.${domain[domain.length - 1]}` : undefined;
}

function loadCookie() {
	readSession();

	const cookie = Cookies.get(`${sessionId}_basset`);

	if (cookie) {
		const cachedVariables = JSON.parse(cookie);

		Object.keys(cachedVariables).forEach((variable) => {
			cache[variable] = cachedVariables[variable];
		});

		setCookie(cookie);
	}

	cookieLoaded = true;
}

function synchronizeCookie() {
	const cachedVariables = {};

	Object.keys(cache).forEach((variable) => {
		if (cache[variable].withCookie) {
			cachedVariables[variable] = cache[variable];
		}
	});

	setCookie(JSON.stringify(cachedVariables));
}

function setCookie(value) {
	Cookies.set(`${sessionId}_basset`, value, {
		maxAge: cacheMaxAge,
		expires: new Date(new Date().getTime() + cacheMaxAge),
		path: '/',
		domain: getCookieDomain(),
		overwrite: true
	});
}

function getResult(samplingLimits, name, withCookie) {
	const randomValue = Math.round(Random.getRandom() * (precision * 100)) | 0, // eslint-disable-line no-bitwise
		result = samplingLimits.some(value => randomValue < value);

	if (name) {
		addResultToCache(name, result, samplingLimits, withCookie);
	}

	return result;
}

function isSampledForGeo(countryList, geo, name) {
	const countryListWithSampling = countryList.filter(hasSampling(geo)),
		cachedWithCookie = hasCache(countryList);

	if (countryListWithSampling.length === 0) {
		return false;
	}

	return getResult(countryListWithSampling.map(getSamplingLimits), name, cachedWithCookie);
}

function containsEarth(countryList, name) {
	return countryList.indexOf(earth) > -1 || isSampledForGeo(countryList, earth, name);
}

/**
 * Return geo data from cookie
 * @returns {Object}
 */
function getGeoData() {
	if (geoData === null) {
		const jsonData = decodeURIComponent(Cookies.get('Geo'));

		try {
			geoData = JSON.parse(jsonData) || {};
		} catch (e) {
			geoData = {};
		}
	}

	return geoData;
}

/**
 * Set geo data
 * @param {Object} data
 * @returns {void}
 */
export function setGeoData(data) {
	geoData = data;
}

/**
 * Return country code based on cookie
 * @returns {string}
 */
export function getCountryCode() {
	return getGeoData().country;
}

/**
 * Return continent code based on cookie
 * @returns {string}
 */
export function getContinentCode() {
	return getGeoData().continent;
}

/**
 * Return region code based on cookie
 * @returns {*}
 */
export function getRegionCode() {
	return getGeoData().region;
}

/**
 * Checks whether current country (from cookie) is listed in array
 * @param {string[]} countryList
 * @param {string|undefined}name
 * @returns {boolean}
 */
export function isProperCountry(countryList = [], name) {
	return !!(
		countryList &&
		countryList.indexOf &&
		(countryList.indexOf(getCountryCode()) > -1 || isSampledForGeo(countryList, getCountryCode(), name))
	);
}

/**
 * Checks whether current regions (from cookie) is listed in array
 * @param {string[]} countryList
 * @param {string|undefined} name
 * @returns {boolean}
 */
export function isProperRegion(countryList = [], name) {
	const code = `${getCountryCode()}-${getRegionCode()}`;
	return !!(
		countryList &&
		countryList.indexOf &&
		(countryList.indexOf(code) > -1 || isSampledForGeo(countryList, code, name))
	);
}

function containsContinent(countryList = [], name) {
	const geo = `${earth}-${getContinentCode()}`;
	return countryList.indexOf(geo) > -1 || isSampledForGeo(countryList, geo, name);
}

/**
 * Checks whether current continent (from cookie) is listed in array
 * @param {string[]} countryList
 * @param {string|undefined} name
 * @returns {boolean}
 */
export function isProperContinent(countryList = [], name) {
	return !!(
		countryList &&
		countryList.indexOf &&
		(containsEarth(countryList, name) || containsContinent(countryList, name))
	);
}

/**
 * Checks whether current geo is excluded in array (by using non- prefix)
 * @param {string[]} countryList
 * @returns {boolean}
 */
function isGeoExcluded(countryList = []) {
	return !!(
		countryList.indexOf(`${negativePrefix}${getCountryCode()}`) > -1 ||
		countryList.indexOf(`${negativePrefix}${getCountryCode()}-${getRegionCode()}`) > -1 ||
		countryList.indexOf(`${negativePrefix}${earth}-${getContinentCode()}`) > -1
	);
}

function getResultLog(name) {
	const entry = cache[name];

	return `${entry.name}_${entry.group}_${entry.limit}`;
}

export function resetSamplingCache() {
	cache = {};
}

export function setSessionId(sid) {
	sessionId = sid;
	cookieLoaded = false;
}

export function getSamplingResults() {
	return Object.keys(cache).map(getResultLog);
}

/**
 * Checks whether current geo (from cookie) is listed in array and it's not excluded
 *
 * @param {string[]} countryList
 * @param {string|undefined} name
 * @returns {boolean}
 */
export function isProperGeo(countryList = [], name = undefined) {
	if (!cookieLoaded) {
		loadCookie();
	}

	if (name !== undefined && typeof cache[name] !== 'undefined') {
		return cache[name].result;
	}
	return !!(
		countryList &&
		countryList.indexOf &&
		!isGeoExcluded(countryList) &&
		(isProperContinent(countryList, name) || isProperCountry(countryList, name) || isProperRegion(countryList, name))
	);
}

/**
 * Transform sampling results using supplied key-values map.
 *
 * @param {string[] | undefined} keyVals mapping
 * @returns {string[]}
 */
export function mapSamplingResults(keyVals) {
	if (!keyVals || !keyVals.length) {
		return [];
	}

	const labradorVariables = module.getSamplingResults();

	return keyVals
		.map(keyVal => keyVal.split(':'))
		.filter(keyVal => labradorVariables.indexOf(keyVal[0]) !== -1)
		.map(keyVal => keyVal[1]);
}

const module = {
	getContinentCode,
	getCountryCode,
	getRegionCode,
	getSamplingResults,
	isProperGeo,
	resetSamplingCache,
	setSessionId,
	mapSamplingResults,
};

export default module;
