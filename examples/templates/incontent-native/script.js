import { AdEngine, context, templateService } from '@wikia/ad-engine';
import { IncontentNative } from '@wikia/ad-products';
import customContext from '../../context';

context.extend(customContext);

templateService.register(IncontentNative);

new AdEngine().init();
