import { utils } from '@wikia/ad-engine';
import { AdInfoContext } from '../../ad-tracking';

export const slotBillTheLizardStatusTrackingMiddleware: utils.Middleware<AdInfoContext> = (
	{ data, slot },
	next,
) => {
	return next({
		slot,
		data: {
			...data,
			btl: slot.getConfigProperty('btlStatus') || '',
		},
	});
};
