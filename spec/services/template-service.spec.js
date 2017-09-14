import TemplateFake from '../template-fake';
import TemplateService from '../../src/services/template-service';

QUnit.module('TemplateService test', {});

QUnit.test('call not existing template', (assert) => {
	assert.expect(1);

	assert.throws(
		() => {
			TemplateService.init('foo', {});
		},
		'Template foo does not exist.'
	);
});

QUnit.test('call registered template', (assert) => {
	assert.expect(1);

	TemplateService.register(TemplateFake);

	assert.equal('executed', TemplateService.init('fake', {}));
});
