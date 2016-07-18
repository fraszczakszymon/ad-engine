'use strict';

import TemplateFake from '../template-fake';
import TemplateService from '../../src/services/template-service';

QUnit.module('TemplateService test', {});

QUnit.test('call not existing template', function (assert) {
	assert.expect(1);

	assert.throws(
		() => {
			TemplateService.init('foo', {})
		},
		'Template foo does not exist.'
	);
});

QUnit.test('call registered template', function (assert) {
	assert.expect(1);

	TemplateService.register('fake', TemplateFake);

	assert.equal('executed', TemplateService.init('fake', {}));
});
