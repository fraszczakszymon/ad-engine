import { AdEngine, btfBlockerService, context } from '@wikia/ad-engine';
import { SlotConfig } from '../../../src/ad-engine/models';
import customContext from '../../context';
import '../../styles.scss';

context.extend(customContext);
// Disable firstCall slots
context.set('slots.top_leaderboard.disabled', true);
context.set('slots.incontent_native.disabled', true);

new AdEngine().init();
