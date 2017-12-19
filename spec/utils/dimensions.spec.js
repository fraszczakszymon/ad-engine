import { expect } from 'chai';
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

describe('dimensions', () => {
	it('getTopOffset of single element', () => {
		const element = getMockElement();

		expect(getTopOffset(element)).to.equal(50);
	});

	it('getTopOffset of nested element', () => {
		const parent = getMockElement({ offsetTop: 100 }),
			element = getMockElement({ offsetParent: parent });

		expect(getTopOffset(element)).to.equal(150);
	});

	it('getTopOffset of nested iframe element', () => {
		const iframeParent = getMockElement({ offsetTop: 30 }),
			iframe = getMockElement({ offsetParent: iframeParent, offsetTop: 200 }),
			parent = getMockElement({ offsetTop: 100 }),
			element = getMockElement({ offsetParent: parent, offsetTop: 50 }, iframe);

		expect(getTopOffset(element)).to.equal(380);
	});

	it('getTopOffset of hidden element', () => {
		const element = getMockElement({}, null, true);

		sinon.spy(element.classList, 'add');
		sinon.spy(element.classList, 'remove');

		expect(getTopOffset(element)).to.equal(50);

		expect(element.classList.add.calledWith('hide')).to.be.ok;
		expect(element.classList.remove.calledWith('hide')).to.be.ok;
	});
});
