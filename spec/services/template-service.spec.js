import { expect } from 'chai';
import TemplateFake from '../template-fake';
import TemplateService from '../../src/services/template-service';

describe('template-service', () => {
	it('call not existing template', () => {
		expect(() => {
			TemplateService.init('foo', {});
		}).to.throw('Template foo does not exist.');
	});

	it('call registered template', () => {
		TemplateService.register(TemplateFake);

		expect('executed').to.equal(TemplateService.init('fake', {}));
	});
});
