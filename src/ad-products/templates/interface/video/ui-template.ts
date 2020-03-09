import { Panel } from './panel';
import PauseControl from './pause-control';
import ToggleFullscreen from './toggle-fullscreen';
import VolumeControl from './volume-control';

export const createBottomPanel = ({ fullscreenAllowed = true, theme = null }) => {
	const isHiVi = theme === 'hivi';
	let panelClassName = 'bottom-panel';

	if (isHiVi) {
		panelClassName += ' dynamic-panel';
	}

	return new Panel(panelClassName, [
		isHiVi ? PauseControl : null,
		VolumeControl,
		isHiVi && fullscreenAllowed ? ToggleFullscreen : null,
	]);
};
