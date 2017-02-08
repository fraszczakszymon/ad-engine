import QueryString from './../utils/query-string';

function getQueryParam() {
	return QueryString.get('resolved_state', null);
}

function isForcedByURLParam() {
	return [true, 'true', '1'].indexOf(getQueryParam()) > -1;
}

function isBlockedByURLParam() {
	return [false, 'blocked', 'false', '0'].indexOf(getQueryParam()) > -1;
}

function paramsAreCorrect(params) {
	return params.resolveState.aspectRatio > 0 && params.resolveState.imageSrc !== '';
}

function hasResolvedState(params) {
	return isForcedByURLParam() || (paramsAreCorrect(params) && !isBlockedByURLParam());
}

function setResolveState(params) {
	params.backgroundImage.src = params.resolveState.imageSrc;
	params.aspectRatio = params.resolveState.aspectRatio;
	return params;
}

function templateSupportsResolveState(params) {
	return params.backgroundImage;
}

function setDefaultState(params) {
	params.backgroundImage.src = params.imageSrc;
	return params;
}

export default {
	setImage(params) {
		if (templateSupportsResolveState(params)) {
			params = hasResolvedState(params) ? setResolveState(params) : setDefaultState(params);
		}

		return params;
	}
};
