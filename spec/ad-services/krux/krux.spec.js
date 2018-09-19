import { expect } from 'chai';
import { context } from '../../../src/ad-engine/index';
import { krux } from '../../../src/ad-services/krux';

describe('Krux service', () => {
	beforeEach(() => {
		window.localStorage = {};
		window.localStorage.kxuser = 'foo';
		window.localStorage.kxsegs = 'abc,bar,zxc';
		context.set('services.krux', {
			enabled: true,
			id: 'foo',
		});
		context.set('targeting.foo', 'bar');
		context.set('targeting.kuid', null);
		context.set('targeting.ksg', null);
	});

	afterEach(() => {
		delete window.localStorage;
		delete window.kruxDartParam_foo;
	});

	it('import user data and return user id', () => {
		krux.importUserData();

		expect(krux.getUserId()).to.equal('foo');
	});

	it('import user data and return segments', () => {
		krux.importUserData();

		expect(krux.getSegments()[0]).to.equal('abc');
		expect(krux.getSegments()[1]).to.equal('bar');
		expect(krux.getSegments()[2]).to.equal('zxc');
	});

	it('export context targeting to krux', () => {
		krux.exportPageParams();

		expect(window.kruxDartParam_foo).to.equal('bar');
	});
});
