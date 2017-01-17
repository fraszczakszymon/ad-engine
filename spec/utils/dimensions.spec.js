import { getTopOffset } from '../../src/utils/dimensions';

function getMockElement(params, frameElement) {
	let offsetParent = null,
		offsetTop = 50,
		offsetHeight = 100;

	if (params) {
		offsetParent = params.offsetParent === undefined ? offsetParent : params.offsetParent;
		offsetTop = params.offsetTop === undefined ? offsetTop : params.offsetTop;
		offsetHeight = params.offsetHeight === undefined ? offsetHeight : params.offsetHeight;
	}

	return {
		offsetParent,
		offsetTop,
		offsetHeight,
		ownerDocument: {
			defaultView: {
				frameElement: frameElement || null
			}
		}
	};
}

QUnit.test('getTopOffset of single element', (assert) => {
	assert.expect(1);

	const element = getMockElement();

	assert.equal(getTopOffset(element), 50);
});

QUnit.test('getTopOffset of nested element', (assert) => {
	assert.expect(1);

	const parent = getMockElement({ offsetTop: 100 }),
		element = getMockElement({ offsetParent: parent });

	assert.equal(getTopOffset(element), 150);
});

QUnit.test('getTopOffset of nested iframe element', (assert) => {
	assert.expect(1);

	const iframeParent = getMockElement({ offsetTop: 30 }),
		iframe = getMockElement({ offsetParent: iframeParent, offsetTop: 200 }),
		parent = getMockElement({ offsetTop: 100 }),
		element = getMockElement({ offsetParent: parent, offsetTop: 50 }, iframe);

	assert.equal(getTopOffset(element), 380);
});
