import sinon from 'sinon';
import QueryString from './../../src/utils/query-string';
import ResolveState from './../../src/services/resolve-state';

QUnit.module('ResolveState test', {});

const BIG_IMAGE = 'bigImage.png',
	DEFAULT_IMAGE = 'oldImage.png',
	RESOLVED_IMAGE = 'resolvedImage.png',
	data = {
		PARAMS: {
			CORRECT: {
				imageSrc: BIG_IMAGE,
				aspectRatio: 1,
				resolveState: {
					aspectRatio: 2,
					imageSrc: RESOLVED_IMAGE
				},
				backgroundImage: {
					src: DEFAULT_IMAGE
				}
			},
			INCORRECT: {
				aspectRatio: 1,
				imageSrc: BIG_IMAGE,
				resolveState: {
					aspectRatio: 0,
					imageSrc: RESOLVED_IMAGE
				},
				backgroundImage: {
					src: DEFAULT_IMAGE
				}
			},
			EMPTY: {}
		}
	},
	testCases = [
		{
			params: data.PARAMS.CORRECT,
			queryParam: 'pierwszy',
			expected: RESOLVED_IMAGE
		},
		{
			params: data.PARAMS.INCORRECT,
			queryParam: null,
			expected: BIG_IMAGE
		},
		{
			params: data.PARAMS.INCORRECT,
			queryParam: 'true',
			expected: RESOLVED_IMAGE
		},
		{
			params: data.PARAMS.INCORRECT,
			queryParam: true,
			expected: RESOLVED_IMAGE
		},
		{
			params: data.PARAMS.INCORRECT,
			queryParam: 'blocked',
			expected: BIG_IMAGE
		},
		{
			params: data.PARAMS.CORRECT,
			queryParam: 'blocked',
			expected: BIG_IMAGE
		},
		{
			params: data.PARAMS.INCORRECT,
			queryParam: 'a',
			expected: BIG_IMAGE
		},
		{
			params: data.PARAMS.INCORRECT,
			queryParam: '1',
			expected: RESOLVED_IMAGE
		},
		{
			params: data.PARAMS.INCORRECT,
			queryParam: '0',
			expected: BIG_IMAGE
		}
	];

testCases.forEach((testCase) => {
	const testName = `Should return ${testCase.expected} when params: ${JSON.stringify(testCase.params)} and 
	resolvedState query param equals: ${testCase.queryParam}`;

	QUnit.test(testName, (assert) => {
		sinon.stub(QueryString, 'get');
		QueryString.get.returns(testCase.queryParam);

		assert.equal(testCase.expected, ResolveState.setImage(testCase.params).backgroundImage.src);
		QueryString.get.restore();
	});
});

QUnit.test('Should update params aspect ratio', (assert) => {
	assert.equal(ResolveState.setImage(data.PARAMS.CORRECT).aspectRatio, data.PARAMS.CORRECT.resolveState.aspectRatio);
});

QUnit.test('Should update image src', (assert) => {
	const params = data.PARAMS.CORRECT;
	assert.equal(ResolveState.setImage(params).backgroundImage.src, params.resolveState.imageSrc);
});

QUnit.test('Should not update image if there is no background image (template without backgroundImage)', (assert) => {
	const params = {};
	assert.equal(ResolveState.setImage(params), params);
});
