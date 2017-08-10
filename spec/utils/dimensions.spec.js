import sinon from 'sinon';
import { getTopOffset } from '../../src/utils/dimensions';

function getMockElement(params, frameElement = null, hidden = false) {
	let offsetParent = null,
		offsetTop = 50,
		offsetHeight = 100;

	if (params) {
		offsetParent = params.offsetParent === undefined ? offsetParent : params.offsetParent;
		offsetTop = params.offsetTop === undefined ? offsetTop : params.offsetTop;
		offsetHeight = params.offsetHeight === undefined ? offsetHeight : params.offsetHeight;
	}

	return {
		classList: {
			add: () => {},
			contains: () => hidden,
			remove: () => {}
		},
		offsetParent,
		offsetTop,
		offsetHeight,
		ownerDocument: {
			defaultView: {
				frameElement
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

QUnit.test('getTopOffset of hidden element', (assert) => {
	assert.expect(3);

	const element = getMockElement({}, null, true);

	sinon.spy(element.classList, 'add');
	sinon.spy(element.classList, 'remove');

	assert.equal(getTopOffset(element), 50);

	assert.ok(element.classList.add.calledWith('hide'));
	assert.ok(element.classList.remove.calledWith('hide'));
});
